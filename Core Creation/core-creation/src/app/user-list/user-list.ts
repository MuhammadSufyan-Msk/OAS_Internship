import { Component } from '@angular/core';
import { TableColumn } from '../table';
import { CoreTableComponent } from '../core/core-table/core-table';

@Component({
  selector: 'app-user-list',
  imports: [CoreTableComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userCols: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Employee Name' },
    { key: 'role', label: 'Position' }
  ];
  userData = [
    { id: 1, name: 'MSK', role: 'Frontend Developer' },
    { id: 2, name: 'Kamran Anwer', role: 'Team Lead' }
  ];
}
