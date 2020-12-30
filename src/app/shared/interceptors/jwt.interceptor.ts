import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from '@services/authentication.service';
import { LoaderService } from '@services/loader.service';
import { catchError, finalize } from 'rxjs/operators';
import { showToastError } from '@shared/helpers/toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private loadeService: LoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadeService.show();
    const currentUser: any = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser?.access_token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError(() => {
        showToastError('Ocorreu um erro na requisição', 'Ops...');
        return of(null);
      }),
      finalize(() => this.loadeService.hide())
    );
  }
}
