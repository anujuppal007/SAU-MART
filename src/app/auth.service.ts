import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new Subject<User>();
  private  apiUrl = '/api/auth/';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    const loginCredentials = { email,password };
    console.log('login credentials', loginCredentials);
    
    return this.httpClient.post<User>(`${this.apiUrl}login`, loginCredentials).pipe( 
      switchMap(foundUser => {
          this.setUser(foundUser);
          console.log(`user found`, foundUser);
          return of(foundUser);
      }),
      catchError(e => {
        console.log(`Your login details could not be verified. Please try again`,  e);
        return throwError(`Your login details could not be verified. Please try again`);
      })
    );
  }

  logout(){
    //remove user from subject
    this.setUser(null);
    console.log('user did logout successfully');
  }

  getUser() {
    return this.user$.asObservable();
  }

  register(user: any) {
    // //make an api call to save user in db
    // //update the user subject
    // this.setUser(user);
    // console.log('registered user successfully', user);
    // return of(user);
    return this.httpClient.post<User>(`${this.apiUrl}register`, user).pipe
    (
      switchMap(savedUser => {
        this.setUser(savedUser);
        console.log(`user registered successfully`, savedUser);
        return of(savedUser);
      }),
      catchError(error => {
        console.log(`server error occured`);
        return throwError(`Registration failed please connect to admin`);
      })
    );
  }

  private setUser(user){
    this.user$.next(user);
  }
}
