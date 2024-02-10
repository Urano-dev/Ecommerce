import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../modules/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(public dialog: MatDialog) {}

  openDialog(title: string, message: string, button: string, cb?: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        message: message,
        button: button,
      },
      maxWidth: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.reintentar();

      if (result) {
        cb ? cb() : '';
      }
    });
  }
  reintentar() {
    throw new Error('Method not implemented.');
  }
}
