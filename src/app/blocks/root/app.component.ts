import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/user';

@Component({
  selector: 'sau-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit{
  user: Observable<User>;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    this.user = this.authService.user;
    this.userSubscription = this.authService.findMe().subscribe(user => (this.user = user));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
