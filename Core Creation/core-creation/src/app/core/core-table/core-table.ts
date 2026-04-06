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
        <th>Actions</th>
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
          <td [attr.colspan]="columns().length + 1" style="text-align: center;">
            No Data Available
          </td>
        </tr>
      }
    </tbody>

    <tfoot>
      <tr>
        @for (col of columns(); track col.key) {
          <td>
            @if (col.key === 'id') {
              <span class="next-id-preview">
                {{data().length + 1}}
              </span>
            } @else {
              <input 
                [(ngModel)]="newEntry[col.key]"
                [placeholder]="'Enter ' + col.label"
                class="inline-input"
              >
            }
          </td>
        }
        <td  style="text-align: center;">
          <button (click)="emitAdd()" class="add-btn">Add Row</button>
        </td>
      </tr>
    </tfoot>
  </table>
  `,
  styleUrl: './core-table.css', // Fix: It must be 'styleUrl' (singular) for a string path
})
export class CoreTableComponent {
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();

  // Fix: changed from any[] to any because you emit one object at a time
  onAddRow = output<any>();
  // Fix: Added the missing output for deletion
  onDeleteRow = output<number | string>();

  newEntry: any = {};

  emitAdd() {
    // Basic validation to prevent empty rows
    if (Object.keys(this.newEntry).length > 0) {
      this.onAddRow.emit(this.newEntry);
      this.newEntry = {};
    }
  }

  emitDelete(id: number | string) {
    this.onDeleteRow.emit(id);
  }
}