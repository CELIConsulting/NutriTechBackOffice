import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatDialog } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
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
  ];
  dataSource: MatTableDataSource<User>;
  usuarios: User[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private loader: LoadingSpinnerService,
    public auth: AngularFireAuth
  ) { }

  cargarGrilla() {
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
  ngOnInit() {
    this.cargarGrilla();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(email: string) {
    this.usersService.deleteUser(email).subscribe(
      (data) => {
        this.dialog.open(PopUpComponent, {
          data: { title: "Listo!", message: "El usuario fue eliminado." },
        });
        this.cargarGrilla();
      },
      (err) => {
        this.dialog.open(PopUpComponent, {
          data: { title: "Oops!", message: "El usuario no se pudo eliminar." },
        });
      }
    );
  }
}
