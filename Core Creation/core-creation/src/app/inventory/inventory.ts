import { Component, signal } from '@angular/core';
import { CoreTableComponent } from '../core/core-table/core-table';
import { TableColumn } from '../table';

@Component({
  selector: 'app-inventory',
  imports: [CoreTableComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  inventoryCols: TableColumn[] = [
    { key: 'code', label: 'Product Code' },
    { key: 'price', label: 'Price (PKR)' },
  ];
  inventoryData = signal([
    { id: 1, code: 'A101', price: 5000 },
    { id: 2, code: 'B202', price: 12000 }
  ]);

  addStock(newEntry: any) {
    this.inventoryData.update(current => {
      // Logic to sync ID: find the max ID and add 1
      const maxId = current.length > 0 ? Math.max(...current.map(p => p.id)) : 0;
      
      const finalProduct = {
        ...newEntry,
        id: maxId + 1
      };
      return [...current, finalProduct];
    });
  };

  removeStock(id: number | string) {
    this.inventoryData.update(current => current.filter(p => p.id !== id));
  }
}
