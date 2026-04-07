import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css'
})
export class EditModalComponent {
  tempItem: any;
  objectKeys: string[];

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // We clone the data using the Spread Operator (...) 
    // This ensures the table doesn't update until you click 'Save'
    this.tempItem = { ...data };

    // Generate inputs for all fields except 'id'
    this.objectKeys = Object.keys(this.tempItem).filter(key => key !== 'id');
  }

  onSave(): void {
    this.dialogRef.close(this.tempItem); // Send updated data back
  }

  onCancel(): void {
    this.dialogRef.close(); // Close without saving
  }
}