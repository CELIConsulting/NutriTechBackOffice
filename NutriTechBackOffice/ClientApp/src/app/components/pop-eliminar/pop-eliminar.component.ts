import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopUpData } from 'src/app/interfaces/popUpData';

@Component({
  selector: 'app-pop-eliminar',
  templateUrl: './pop-eliminar.component.html'
})
export class PopEliminarComponent {
  message: string = "Esta seguro?"
  confirmButtonText = "Si"
  cancelButtonText = "Cancelar"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PopEliminarComponent>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
