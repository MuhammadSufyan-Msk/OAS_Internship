import { Component, effect, signal, afterNextRender } from '@angular/core';
import { CoreTableComponent } from '../core/core-table/core-table';
import { TableColumn } from '../table';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CoreTableComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  inventoryCols: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Product Code' },
    { key: 'price', label: 'Price (PKR)' },
  ];

  inventoryData = signal<any[]>([]);
  // FIX: Change this to a Signal so the effect can track it reactively
  private isLoaded = signal(false);
  private readonly STORAGE_KEY = 'management_inventory';

  constructor() {
    afterNextRender(() => {
      const data = this.loadFromStorage();
      this.inventoryData.set(data);
      // Mark as loaded AFTER the data is set
      this.isLoaded.set(true);
    });

    effect(() => {
      // The effect now tracks both: isLoaded() and inventoryData()
      if (this.isLoaded() && typeof window !== 'undefined') {
        const data = this.inventoryData();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        console.log('Saved to storage:', data); // Debugging helper
      }
    });
  }

  private loadFromStorage(): any[] {
    // 1. Server-side guard
    if (typeof window === 'undefined' || !window.localStorage) {
      return this.getDefaultData();
    }

    // 2. Get data from browser
    const saved = localStorage.getItem(this.STORAGE_KEY);

    // 3. If nothing exists at all, return defaults
    if (!saved) return this.getDefaultData();

    try {
      const parsed = JSON.parse(saved);

      // 4. CRITICAL FIX: If the list is empty ([]), return defaults 
      // instead of showing a blank table.
      return (parsed && parsed.length > 0) ? parsed : this.getDefaultData();

    } catch (e) {
      return this.getDefaultData();
    }
  }

  private getDefaultData() {
    return [
      { id: 1, code: 'A101', price: 5000 },
      { id: 2, code: 'B202', price: 12000 },
    ];
  }

  addStock(newEntry: any) {
    this.inventoryData.update((current) => {
      const maxId = current.length > 0 ? Math.max(...current.map((p) => p.id)) : 0;
      return [...current, { ...newEntry, id: maxId + 1 }];
    });
  }

  removeStock(id: number | string) {
    this.inventoryData.update((current) => current.filter((p) => p.id !== id));
  }
}