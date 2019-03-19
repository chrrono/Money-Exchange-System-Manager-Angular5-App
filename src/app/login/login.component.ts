import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthHttpService } from '../http-service/auth-http-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private authHttpService: AuthHttpService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'loginData' : new FormGroup({
        'login' : new FormControl(""),
        'password' : new FormControl("")
        // 'login2' : new FormControl(""),
        // 'password2' : new FormControl("")
      })
    });


  }


  login(){
    this.authHttpService.login(this.loginForm.get('loginData.login').value,
                               this.loginForm.get('loginData.password').value);
    //                            this.loginForm.get('loginData.login2').value,
    //                            this.loginForm.get('loginData.password2').value)
    // this.authHttpService.login("menadzer","menadzer","my-trusted-admin","secret");
  }
}
