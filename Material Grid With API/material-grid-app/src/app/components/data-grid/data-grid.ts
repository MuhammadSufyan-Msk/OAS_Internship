import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import this!
import { CommonModule } from '@angular/common'; // Needed for @if or *ngIf
import { Data } from '../../services/data';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './data-grid.html',
  styleUrl: './data-grid.scss'
})
export class DataGridComponent implements OnInit {
  private dataService = inject(Data);
  
  // Create a loading signal
  isLoading = signal(true); 
  
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit() {
    try {
      this.isLoading.set(true); // Start loading
      const data = await this.dataService.getGridData();
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } finally {
      this.isLoading.set(false); // Stop loading regardless of success/fail
    }
  }
}