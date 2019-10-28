import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {UsersService} from '../services/users.service'

let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable() export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private us: UsersService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.toString()) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            })).catch((error: HttpErrorResponse) => {
             
                 if (error.status === 401) {
                     // auto logout if 401 response returned from api
                     if(request.url.endsWith('user/login')){
                        return throwError('Username or password is incorrect');
                     }else{
                        this.us.logout();
                        location.replace('/login');
                     }
                 }
                 const err = error.error.message || error.statusText;
                 return throwError(error);
            });
    }

}

