import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AlertService } from '../Shared/alert/alert.service';

export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private alertService:AlertService
    ) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(

            catchError((error: HttpErrorResponse) => {

                let errorMessage: string = '';
                let errorStatus: number | null = null;

                // console.log("HttpErrorResponse request : ", request);

                if (error.error instanceof ErrorEvent) {

                    // console.log("client error : ", error);
                    // console.log("client error message : ", error.error.message);

                    errorMessage = error.error.message;
                    // if(error.status != 401 && error.status != 403){
                    //     this.alertService.error(errorMessage)
                    // }
                } else {

                    // console.log("server error : ", error);
                    // console.log("server error status : ", error.status);
                    // console.log("server error message : ", error.message);

                    errorStatus = error.status;
                    errorMessage = error.status + " " + error.message;
                    // if(error.status != 401 && error.status != 403){
                    //     this.alertService.error(errorMessage)
                    // }
                    
                }
                
                return throwError(error);
            })
        )
    }
}

export const HttpErrorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, deps: [ AlertService ] }
];