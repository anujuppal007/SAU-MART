import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'sau-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: BehaviorSubject<string>;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.error = new BehaviorSubject('');
  }

  login(){
    this.setError('');
    this.authService.login(this.email,this.password).subscribe(s => this.router.navigate(['']),
      e => (
        this.setError(e)
      )
    );
  }




  private setError(msg: any) {
    this.error.next(msg);
  }
}
