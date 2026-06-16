import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: { message: string },
      private dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) {}

    onYes(): void {
      this.dialogRef.close(true);
    }

    onNo(): void {
      this.dialogRef.close(false);
    }
}
