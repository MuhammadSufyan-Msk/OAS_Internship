import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../table';

@Component({
  selector: 'app-core-table',
  standalone: true,
  imports: [CommonModule],
  template: `
  <table class="custom-table">
    <thead>
      <tr>
        @for (col of columns(); track col.key) {
          <th>{{col.label}}</th>
        }
      </tr>
    </thead>
    <tbody>
      @for (row of data(); track row) {
        <tr>
          @for (col of columns(); track col.key) {
            <td>{{row[col.key]}}</td>
          }
        </tr>
      }
      @empty {
        <tr>
          <td [attr.colspan]="columns().length">No Data Available</td>
        </tr>
      }
    </tbody>
  </table>
  `,
  styles: [`
    .custom-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-top: 20px; 
    }
    th, td { 
      border: 1px solid #ddd; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background-color: #f4f4f4; 
      font-weight: bold; 
    }
    tr:hover { 
      background-color: #f9f9f9; 
    }`],
})
export class CoreTableComponent { 
  columns =input.required<TableColumn[]>();
  data = input.required<any[]>();
}
