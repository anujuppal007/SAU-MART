import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new Subject<User>();
  private  apiUrl = '/api/auth/';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

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

  register(userToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}register`, userToSave).pipe
    (
      switchMap(({user, token}) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user registered successfully`, user);
        return of(user);
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
