import { Component, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
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
    if (this.newTaskTitle().trim()) {
      this.taskService.addTask(this.newTaskTitle());
      this.newTaskTitle.set('');
    }
  }

  onToggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  // FIXED: Added the delete bridge
  onDeleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  // FIXED: Added the clear all bridge
  onClearAll() {
    this.taskService.clearAll();
  }
}