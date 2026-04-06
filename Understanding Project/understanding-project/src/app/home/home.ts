import { Component, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task';
import { TaskItemComponent } from './task-item/task-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, TaskItemComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private taskService = inject(TaskService);

  protected tasks = this.taskService.tasks;
  protected readonly newTaskTitle = signal("");

  // Computed signals for automatic stat updates
  protected totalCount = computed(() => this.tasks().length);
  protected pendingCount = computed(() =>
    this.tasks().filter(t => !t.completed).length
  );

  onAddTask() {
    const title = this.newTaskTitle().trim();
    if (title.length > 0) {
      this.taskService.addTask(title);
      this.newTaskTitle.set('');
    }
  }

  // These functions now receive the ID sent by the Child's .emit()
  handleToggle(id: number | string) {
    this.taskService.toggleTask(id);
  }

  handleDelete(id: number | string) {
    this.taskService.deleteTask(id);
  }

  // FIXED: Added the clear all bridge
  onClearAll() {
    this.taskService.clearAll();
  }

  onLoadRemote() {
    this.taskService.fetchRemoteTasks();
  }
}