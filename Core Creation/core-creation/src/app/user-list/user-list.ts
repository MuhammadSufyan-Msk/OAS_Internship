import { Component, signal } from '@angular/core';
import { TableColumn } from '../table';
import { CoreTableComponent } from '../core/core-table/core-table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [CoreTableComponent, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userCols: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Employee Name' },
    { key: 'role', label: 'Position' }
  ];
  userData = signal([
    { id: 1, name: 'MSK', role: 'Frontend Developer' },
    { id: 2, name: 'Kamran Anwer', role: 'Team Lead' }
  ]);
  newUserName = '';
  newUserRole = '';

  addUser() {
    if (this.newUserName && this.newUserRole) {
      const newEntry = {
        id: this.userData().length + 1,
        name: this.newUserName,
        role: this.newUserRole,
      };
      this.userData.update(allusers => [...allusers, newEntry]);

      this.newUserName = '';
      this.newUserRole = '';
    }
  }

  addColumn(newKey: string, newLabel: string) {
    this.userCols = [...this.userCols, { key: newKey, label: newLabel }];
  }
  addNewUser(newEntry: any) {
    // Directly update the signal with the new data from the table footer
    this.userData.update(currentUsers => {
      const maxId = currentUsers.length > 0 ? Math.max(...currentUsers.map(u => u.id)) : 0;
      const syncedEntry = {
        ...newEntry,
        id: maxId + 1
      };
      return [...currentUsers, syncedEntry]
    });
  }

  // user-list.ts
  removeUser(id: number | string) {
    // Update the signal by keeping everyone EXCEPT the one with this ID
    this.userData.update(currentUsers =>
      currentUsers.filter(user => user.id !== id)
    );
  }
}
