import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly tasks = signal([
    { id: 1, title: 'Learn Angular Signals', completed: true },
    { id: 2, title: 'Setup Routing in Apps', completed: true },
    { id: 3, title: 'Integrate RESTful APIs', completed: false },
    { id: 4, title: 'Master RxJS Observables', completed: false },
  ]);
  toggleTask(id: number) {
    this.tasks.update(oldTasks =>
      oldTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }
}
