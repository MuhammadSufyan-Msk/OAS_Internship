import { Component, input, output } from '@angular/core';
import { HighlightDirective } from '../highlight';

@Component({
  selector: 'app-task-item',
  standalone: true,
  // We define the HTML and CSS directly here for a small component
  imports : [HighlightDirective],
  template: `
    <li appHighlight [class.is-done]="task().completed">
      <input 
        type="checkbox" 
        [checked]="task().completed" 
        (change)="onToggle()">
      
      <span class="task-title">{{ task().title }}</span>

      <button class="delete-btn" (click)="onDelete()">🗑️</button>
    </li>
  `,
  styles: [`
    li { display: flex; align-items: center; gap: 12px; padding: 10px; border-bottom: 1px solid #eee; }
    .is-done .task-title { text-decoration: line-through; color: #888; }
    .delete-btn { margin-left: auto; color: red; border: none; background: none; cursor: pointer; font-weight: bold; }
  `]
})
export class TaskItemComponent {
  // 1. Update the input to allow both number and string
  task = input.required<{ id: number | string; title: string; completed: boolean }>();

  // 2. Update the outputs to emit both types
  toggle = output<number | string>();
  delete = output<number | string>();

  onToggle() {
    this.toggle.emit(this.task().id);
  }

  onDelete() {
    this.delete.emit(this.task().id);
  }
}