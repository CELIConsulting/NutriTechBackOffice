import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { PopEliminarComponent } from "src/app/components/pop-eliminar/pop-eliminar.component";
import { AuthService } from "src/app/services/auth.service";
import { PopUpComponent } from "../../components/pop-up/pop-up.component";
import { User } from "../../interfaces/user";
import { LoadingSpinnerService } from "../../services/loading-spinner.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-listado-usuarios",
  templateUrl: "./listado-usuarios.component.html",
  styleUrls: ["./listado-usuarios.component.css"],
})
export class ListadoUsuariosComponent implements OnInit {
  loading$ = this.loader.loading$;

  displayedColumns: string[] = [
    "nombre",
    "apellido",
    "rol",
    "email",
    "telefono",
    "fechaNacimiento",
    "eliminar",
    "modificar",
    "verCargaDiaria",
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  usuarios: User[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //validate claims of the loged user
  userClaims: any;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private loader: LoadingSpinnerService,
    private authService: AuthService
  ) {
    this.userClaims = authService.getUserClaims();
  }

  loadAdminGrid() {
    this.usersService.getUsers().subscribe(
      (user) => {
        this.usuarios = user;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error("No se pudo obtener a los usuarios registrados");
        console.log(error);
      }
    );
  }

  loadNutrittionistGrid() {
    this.usersService.getPatients().subscribe(
      (user) => {
        this.usuarios = user;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error("No se pudo obtener a los usuarios registrados");
        console.log(error);
      }
    );
  }

  cargarGrilla() {
    this.authService.getUserClaims().subscribe(data => {
      this.userClaims = data;
      console.log(this.userClaims);
      if (this.userClaims != null) {
        if (this.userClaims.Nutricionista) {
          console.log("es nutricionista");
          this.loadNutrittionistGrid();
        }
        if (this.userClaims.Admin) {
          console.log("es admin");
          this.loadAdminGrid();
        }
      }
    }, err => {
      console.log("claims err: ", err);
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

  openDialog(email: string) {
    const dialogRef = this.dialog.open(PopEliminarComponent, {
      data: {
        message: 'Esta seguro que quiere eliminar?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.usersService.deleteUser(email).subscribe(
          (data) => {
            const dialogRef2 = this.dialog.open(PopUpComponent, {
              data: { title: "Listo!", message: "El usuario fue eliminado." },
            });

            dialogRef2.afterClosed().subscribe(() => {
              this.cargarGrilla();
            })
          },
          (err) => {
            this.dialog.open(PopUpComponent, {
              data: { title: "Oops!", message: "El usuario no se pudo eliminar." },
            });
          }
        );
      }
      else {

      }
    });
  }


}
