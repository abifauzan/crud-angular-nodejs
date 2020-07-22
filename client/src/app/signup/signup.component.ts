import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  registerUser(): void {
    this.authService.signUp(this.signupForm.value)
      .subscribe((res) => {
        console.log(res);
        if (res.user) { // commonly result, not user
          // this.router.navigate(['signin']).then( (e) => {
          //   if (e) {
          //     console.log('Navigation is successful!');
          //   } else {
          //     console.log('Navigation has failed!');
          //   }
          // });
          this.router.navigate(['signin']);
          // console.log('Register success');
          this.signupForm.reset();

        }
      }, (err) => {
        console.log(err);
      });
  }

}
