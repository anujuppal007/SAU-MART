import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/user';

@Component({
  selector: 'sau-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  user: any;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router){
    let a = 'anuj'
    this.authService.findMe().subscribe(user => (this.user = user));
    
    this.userSubscription = this.authService.user.subscribe(user => (this.user = user));
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
