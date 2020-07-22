import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './../models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Sign up
  signUp(user: User): Observable<any> {
    const api = `${environment.serverUrl}/${environment.apiEndPoint}/users/signup`;
    console.log(user);
    // return of(user);
    return this.http.post<User>(api, user, { headers: this.headers })
      .pipe(
        tap(_ => console.log('Data registered')),
        catchError(this.handleError('signUp'))
      );
  }

  // Sign in
  signIn(user: User) {
    const api = `${environment.serverUrl}/${environment.apiEndPoint}/users/signin`;
    // console.log(user);
    // return user;
    return this.http.post(api, user, { headers: this.headers })
      .subscribe((res: any) => {
        // console.log(res);
        if(res.user) {
          localStorage.setItem('access_token', res.user.token);
          this.getUserProfile(res.user._id).subscribe((res) => {
            this.currentUser = res;
            console.log(this.currentUser);
            this.router.navigate(['dashboard']);
            // this.router.navigate(['dashboard/profile/' + res.user._id]);
          });
        }

        console.log('User not found');

      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['signin']);
    }
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  // Get user profile
  getUserProfile(): Observable<any> {
    const api = `${environment.serverUrl}/${environment.apiEndPoint}/users/current`;
    return this.http.get(api, { headers: this.headers })
      .pipe(
        tap(_ => console.log('Get user profile success')),
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.handleError('getUserProfile'))
      );
  }


}
