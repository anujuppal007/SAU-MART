import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sau-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.email,this.password).subscribe(s => this.router.navigate(['']));
  }
}
