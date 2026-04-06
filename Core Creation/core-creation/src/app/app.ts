import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserList } from './user-list/user-list';
import { Inventory } from './inventory/inventory';


@Component({
  selector: 'app-root',
  standalone: true, // Ensure this is here
  imports: [RouterOutlet, UserList, Inventory], // Add UserList here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Core Table Creation');
}