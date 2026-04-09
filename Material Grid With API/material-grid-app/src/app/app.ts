import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Check this import path carefully based on your folder structure!
import { GridComponent } from './components/data-grid/data-grid'; 

@Component({
  selector: 'app-root',
  standalone: true, // Make sure this is present
  imports: [
    RouterOutlet, 
    GridComponent // THIS CLEARS THE ERROR
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('material-grid-app');
}