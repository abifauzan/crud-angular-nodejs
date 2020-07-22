import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }

}
