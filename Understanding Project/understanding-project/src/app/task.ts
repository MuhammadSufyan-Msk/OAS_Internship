import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes the service a "Singleton" available app-wide
})
export class TaskService {
  // 1. Private signal to prevent direct modification from outside
  private tasksSignal = signal([
    { id: 1, title: 'Learn Angular Signals', completed: true },
    { id: 2, title: 'Setup Routing in Apps', completed: true },
    { id: 3, title: 'Integrate RESTful APIs', completed: false },
    { id: 4, title: 'Master RxJS Observables', completed: false },
  ]);

  // 2. Read-only version for components to "listen" to
  tasks = this.tasksSignal.asReadonly();

  // 3. Logic to add a new task
  addTask(title: string) {
    const newId = Date.now(); // Generates a unique ID based on the timestamp
    const newTask = { id: newId, title, completed: false };
    
    // Using the Spread operator (...) to maintain immutability
    this.tasksSignal.update(all => [...all, newTask]);
  }

  // 4. Logic to toggle the completed status
  toggleTask(id: number) {
    this.tasksSignal.update(all =>
      all.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  // 5. FIXED: Logic to delete a specific task
  deleteTask(id: number) {
    // .filter creates a NEW array excluding the ID we clicked
    this.tasksSignal.update(all => all.filter(t => t.id !== id));
  }

  // 6. FIXED: Logic to clear the entire list
  clearAll() {
    // Sets the signal back to an empty array
    this.tasksSignal.set([]);
  }
}