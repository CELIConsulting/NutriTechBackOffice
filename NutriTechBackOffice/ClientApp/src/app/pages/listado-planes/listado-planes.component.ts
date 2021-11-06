import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { PlanAlimentacion } from 'src/app/interfaces/plan-alimentacion';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-listado-planes',
  templateUrl: './listado-planes.component.html',
  styleUrls: ['./listado-planes.component.css']
})
export class ListadoPlanesComponent implements OnInit {

  loading$ = this.loader.loading$;

  displayedColumns: string[] = 
  ['nombre', 
  'tipo', 
  'cantidadAgua', 
  'cantidadColaciones', 
  'desayuno', 
  'almuerzo', 
  'merienda', 
  'cena',
  'colacion',
  'eliminar', 
  'modificar'];

  dataSource: MatTableDataSource<PlanAlimentacion>;
  planesAlimentacion: PlanAlimentacion[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private planesService: PlanesService, private dialog: MatDialog, private loader: LoadingSpinnerService) {
  }

  cargarGrilla() {
    this.planesService.getAllPlans()
      .subscribe(
        planes => {
          this.planesAlimentacion = planes;
          this.dataSource = new MatTableDataSource(this.planesAlimentacion);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          console.error("No se pudo obtener los planes guardados")
          console.log(error)
        });

  }
  ngOnInit() {
    this.cargarGrilla();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  eliminar(nombre: string) {
    this.planesService.deletePlan(nombre).subscribe(
      data => {
        this.dialog.open(PopUpComponent, { data: { title: "Listo!", message: "El plan fue eliminado." } });
        this.cargarGrilla();
      },
      err => {
        this.dialog.open(PopUpComponent, { data: { title: "Oops!", message: "El plan no se pudo eliminar." } })
      }
    )
  }

}
