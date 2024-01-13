import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatPaginatorDefaultOptions } from "@angular/material/paginator";


export class Constants {

  /**Valores por defecto para los snackbar */
  public static SNACKBAR_DEFAULTS: MatSnackBarConfig = { duration: 3000 };

  /**Mensajes de error */
  public static ERROR_COMM = `An error has occurred in the communication with the server`;
  public static ERROR_SAVING = `An error occurred while saving the data`;
  
}
