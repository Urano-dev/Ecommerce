import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../modules/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  constructor(public dialog: MatDialog) {}

    /*
    *@param title = tittle of the box
    *@param message = content of the message
    *@param button = content of the button
    */
  openDialog(title: string, message: string, button: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        message: message,
        button: button,
      },
      maxWidth: '450px',
    });

    return dialogRef.afterClosed().pipe( 
        map(result => {
              return result;
            }))}
}
