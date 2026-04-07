import { Component, effect, signal, afterNextRender } from '@angular/core';
import { TableColumn } from '../table';
import { CoreTableComponent } from '../core/core-table/core-table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CoreTableComponent, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userCols: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Employee Name' },
    { key: 'role', label: 'Position' },
  ];

  userData = signal<any[]>([]);
  private isLoaded = false; // The Guard Flag
  private readonly STORAGE_KEY = 'management_user';

  constructor() {
    afterNextRender(() => {
      const saved = this.loadFromStorage();
      this.userData.set(saved);
      this.isLoaded = true; // Now the effect is allowed to save
    });

    effect(() => {
      const data = this.userData();

      // ONLY save if we have finished the initial load
      if (this.isLoaded && typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      }
    });
  }

  private loadFromStorage(): any[] {
    // 1. Server-side guard
    if (typeof window === 'undefined' || !window.localStorage) {
      return this.getDefaultData();
    }

    // 2. Get data from browser
    const saved = localStorage.getItem(this.STORAGE_KEY);

    // 3. If nothing exists at all, return defaults
    if (!saved) return this.getDefaultData();

    try {
      const parsed = JSON.parse(saved);

      // 4. CRITICAL FIX: If the list is empty ([]), return defaults 
      // instead of showing a blank table.
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

  addNewUser(newEntry: any) {
    this.userData.update((currentUsers) => {
      const maxId = currentUsers.length > 0
        ? Math.max(...currentUsers.map((u) => u.id))
        : 0;

      const syncedEntry = {
        ...newEntry,
        id: maxId + 1,
      };
      return [...currentUsers, syncedEntry];
    });
  }

  removeUser(id: number | string) {
    this.userData.update((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  }
}