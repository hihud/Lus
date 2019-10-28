import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, ErrorObserver, throwError } from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uri = 'https://localhost:44327/api/user';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(Username, Password) {
    const obj = {
      Username,
      Password
    };
    return this.http.post(`${this.uri}/login`, obj).pipe(map((user:User) => {
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token.toString());
        this.currentUserSubject.next(user);
      }
      return user;
    })).catch((error)=>{
      return throwError('Username or password is incorrect');
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  register(Username, Password, Email) {
    const obj = {
      Username, Password, Email
    };
    this.http.post(`${this.uri}/register`, obj)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }
  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
