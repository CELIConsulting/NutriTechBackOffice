import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"
import { finalize } from "rxjs/operators";
import { LoadingSpinnerService } from "../loading-spinner.service"

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingSpinnerService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.loader.hide();
      })
    );
  }

}
