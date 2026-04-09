import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Data } from '../../services/data';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './data-grid.html',
  styleUrl: './data-grid.scss'
})
export class GridComponent implements OnInit {
  private dataService = inject(Data);
  
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit() {
    const data = await this.dataService.getGridData();
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }
}