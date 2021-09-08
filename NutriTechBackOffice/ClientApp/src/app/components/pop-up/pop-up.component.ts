import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpData } from '../../interfaces/popUpData';



@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent  {
  title: string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PopUpData,
    public dialog: MatDialog
  ) { }

}


