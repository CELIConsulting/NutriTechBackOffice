import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { LoadingSpinnerService } from "src/app/services/loading-spinner.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-patient-history",
  templateUrl: "./patient-history.component.html",
  styleUrls: ["./patient-history.component.css"],
})
export class PatientHistoryComponent implements OnInit {
  loading$ = this.loader.loading$;
  emailParam: string;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private loader: LoadingSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  private getRouteParams() {
    this.activatedRoute.paramMap.subscribe(parameters => {
      this.emailParam = parameters.get('email');
    });
  }

  loadDailyUploads() {
    this.getRouteParams();
    this.usersService.getPattientDailyUpload(this.emailParam).subscribe(
      (resp) => {
        console.log('Response: ',resp)
      },
      (error) => {
        console.log('Error: ',error)
      }
    );
  }

  ngOnInit() {
    this.loadDailyUploads()
  }
}
