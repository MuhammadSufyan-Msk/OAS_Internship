import { Component, effect, signal, afterNextRender, inject } from '@angular/core';
import { TableColumn } from '../table';
import { CoreTableComponent } from '../core/core-table/core-table';
import { FormsModule } from '@angular/forms';
// 1. Import Material Dialog tools
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CoreTableComponent, FormsModule, MatDialogModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  // 2. Inject the Dialog Service
  private dialog = inject(MatDialog);

  userCols: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Employee Name' },
    { key: 'role', label: 'Position' },
  ];

  userData = signal<any[]>([]);
  private isLoaded = false; 
  private readonly STORAGE_KEY = 'management_user';

  constructor() {
    afterNextRender(() => {
      const saved = this.loadFromStorage();
      this.userData.set(saved);
      this.isLoaded = true; 
    });

    effect(() => {
      const data = this.userData();
      if (this.isLoaded && typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      }
    });
  }

  // 3. New Method to open the Material Dialog
  openEditUser(user: any) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '450px',
      data: user, // Pass the employee data to the modal
      disableClose: true // Optional: user must click save or cancel
    });

    // 4. Handle the result after the modal closes
    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        this.updateUser(updatedUser);
      }
    });
  }

  // 5. Update the signal with edited data
  updateUser(updatedData: any) {
    this.userData.update((currentUsers) =>
      currentUsers.map((user) => 
        user.id === updatedData.id ? updatedData : user
      )
    );
  }

  // ... (Keep loadFromStorage and getDefaultData exactly as they are)

  addNewUser(newEntry: any) {
    this.userData.update((currentUsers) => {
      const maxId = currentUsers.length > 0
        ? Math.max(...currentUsers.map((u) => u.id))
        : 0;

      const syncedEntry = { ...newEntry, id: maxId + 1 };
      return [...currentUsers, syncedEntry];
    });
  }

  removeUser(id: number | string) {
    this.userData.update((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
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
      { id: 1, name: 'MSK', role: 'Frontend Developer' },
      { id: 2, name: 'Kamran Anwer', role: 'Team Lead' }
    ];
  }
}