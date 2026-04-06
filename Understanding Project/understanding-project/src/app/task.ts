import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes the service a "Singleton" available app-wide
})
export class TaskService {
  // 2. Inject the HTTP tool
  private http = inject(HttpClient);

  // 1. Private signal to prevent direct modification from outside
  private tasksSignal = signal<{ id: number | string; title: string; completed: boolean }[]>([
    { id: 1, title: 'Learn Angular Signals', completed: true },
    { id: 2, title: 'Setup Routing in Apps', completed: true },
    { id: 3, title: 'Integrate RESTful APIs', completed: false },
    { id: 4, title: 'Master RxJS Observables', completed: false },
  ]);

  // 2. Read-only version for components to "listen" to
  tasks = this.tasksSignal.asReadonly();

  fetchRemoteTasks() {
    // This tells the app: "Go to this URL and get 5 items"
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .subscribe((data) => {
        // We transform the API data to match our local format
        const loadTime = Date.now();
        
        const remoteTasks = data.map(t => ({
          id: `api-${t.id}-${loadTime}`,
          title: t.title,
          completed: t.completed
        }));

        // We update our Signal with the new data
        this.tasksSignal.update(current => [...current, ...remoteTasks]);
      });
  }

  addTask(title: string) {
    const newId = Date.now();
    const newTask = { id: newId, title, completed: false }; // Use the variable
    this.tasksSignal.update(all => [...all, newTask]);
  }

  // 4. Logic to toggle the completed status
  toggleTask(id: number | string) {
    this.tasksSignal.update(all =>
      all.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  // 5. FIXED: Logic to delete a specific task
  deleteTask(id: number | string) {
    // .filter creates a NEW array excluding the ID we clicked
    this.tasksSignal.update(all => all.filter(t => t.id !== id));
  }

  // 6. FIXED: Logic to clear the entire list
  clearAll() {
    // Sets the signal back to an empty array
    this.tasksSignal.set([]);
  }
}