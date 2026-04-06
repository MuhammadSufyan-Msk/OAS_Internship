import { Component } from '@angular/core';
import { CoreTableComponent } from '../core/core-table/core-table';
import { TableColumn } from '../table';

@Component({
  selector: 'app-inventory',
  imports: [CoreTableComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  productCol: TableColumn[] = [
    { key: 'code', label: 'Product Code' },
    { key: 'price', label: 'Price (PKR)' },
  ];
  productData = [
    { code: 'A101', price: 5000 },
    { code: 'B202', price: 12000 }
  ]
}
