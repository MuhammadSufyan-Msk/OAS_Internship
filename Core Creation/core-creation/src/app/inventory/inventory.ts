import { Component, effect, signal, afterNextRender, inject } from '@angular/core';
import { TableColumn } from '../table';
import { CoreTableComponent } from '../core/core-table/core-table';
import { FormsModule } from '@angular/forms';
// 1. Import Material Dialog tools
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CoreTableComponent, FormsModule, MatDialogModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  // 2. Inject the Dialog Service
  private dialog = inject(MatDialog);

  inventoryCols: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Product Code' },
    { key: 'price', label: 'Price (PKR)' },
  ];

  inventoryData = signal<any[]>([]);
  private isLoaded = signal(false);
  private readonly STORAGE_KEY = 'management_inventory';

  constructor() {
    afterNextRender(() => {
      const data = this.loadFromStorage();
      this.inventoryData.set(data);
      this.isLoaded.set(true);
    });

    effect(() => {
      if (this.isLoaded() && typeof window !== 'undefined') {
        const data = this.inventoryData();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      }
    });
  }

  // 3. Method to open the Material Dialog for Inventory items
  openEditStock(item: any) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '450px',
      data: item, // Pass the stock item (e.g., A101) to the modal
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((updatedItem) => {
      if (updatedItem) {
        this.updateStock(updatedItem);
      }
    });
  }

  // 4. Update the signal with edited stock data
  updateStock(updatedData: any) {
    this.inventoryData.update((current) =>
      current.map((item) =>
        item.id === updatedData.id ? updatedData : item
      )
    );
  }

  // ... (Keep loadFromStorage, getDefaultData, addStock, and removeStock as they are)

  addStock(newEntry: any) {
    this.inventoryData.update((current) => {
      const maxId = current.length > 0 ? Math.max(...current.map((p) => p.id)) : 0;
      return [...current, { ...newEntry, id: maxId + 1 }];
    });
  }

  removeStock(id: number | string) {
    this.inventoryData.update((current) => current.filter((p) => p.id !== id));
  }

  private loadFromStorage(): any[] {
    if (typeof window === 'undefined' || !window.localStorage) {
      return this.getDefaultData();
    }
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (!saved) return this.getDefaultData();
    try {
      const parsed = JSON.parse(saved);
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
}