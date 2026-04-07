import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-core-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <table class="custom-table">
    <thead>
      <tr>
        @for (col of columns(); track col.key) {
          <th>{{col.label}}</th>
        }
        <th style="width: 100px;">Actions</th>
      </tr>
    </thead>
    <tbody>
      @for (row of data(); track row.id) {
        <tr>
          @for (col of columns(); track col.key) {
            <td>{{row[col.key]}}</td>
          }
          <td style="text-align: center;">
            <button (click)="emitDelete(row.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      }
      @empty {
        <tr>
          <td [attr.colspan]="columns().length + 1" style="text-align: center; padding: 60px; color: #9ca3af;">
            <div style="font-size: 24px; margin-bottom: 8px;">📂</div>
            No entries found in storage.
          </td>
        </tr>
      }
    </tbody>

    <tfoot>
      <tr style="background-color: #f8fafc;">
        @for (col of columns(); track col.key) {
          <td>
            @if (col.key === 'id') {
              <div style="padding-left: 10px; font-weight: bold; color: #a0aec0;">
                #{{ getNextId() }}
              </div>
            } @else {
              <input [(ngModel)]="newEntry[col.key]" 
                    [placeholder]="col.label" 
                    class="inline-input">
            }
          </td>
        }
        <td style="text-align: center;">
          <button (click)="emitAdd()" class="add-btn">Add Row</button>
        </td>
      </tr>
    </tfoot>
  </table>
  `,
  styleUrl: './core-table.css',
})
export class CoreTableComponent {
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();

  onAddRow = output<any>();
  onDeleteRow = output<number | string>();

  newEntry: any = {};

  // This ensures the preview ID in the footer matches the logic in UserList/Inventory
  getNextId(): number {
    const currentData = this.data();
    if (!currentData || currentData.length === 0) return 1;

    const maxId = Math.max(...currentData.map(row => Number(row.id) || 0));
    return maxId + 1;
  }

  emitAdd() {
    // Check if at least one field has been filled (excluding the ID)
    const hasValues = Object.values(this.newEntry).some(v => v && String(v).trim() !== '');

    if (hasValues) {
      // Send a clean copy to the parent
      this.onAddRow.emit({ ...this.newEntry });
      // Reset the object reference to clear all inputs
      this.newEntry = {};
    }
  }

  emitDelete(id: number | string) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.onDeleteRow.emit(id);
    }
  }
}