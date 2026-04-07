import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Update Record</h2>
    <mat-dialog-content>
      @for (key of Object.keys(tempItem); track key) {
        @if (key !== 'id') {
          <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 10px;">
            <mat-label>{{ key | titlecase }}</mat-label>
            <input matInput [(ngModel)]="tempItem[key]">
          </mat-form-field>
        }
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Update Data</button>
    </mat-dialog-actions>
  `
})
export class EditDialogComponent {
  tempItem: any;
  Object = Object;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Create a copy so we don't edit the main table live
    this.tempItem = { ...data };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.tempItem);
  }
}