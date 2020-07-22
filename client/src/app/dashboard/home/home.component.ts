import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./../dashboard.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: object = {};
  title: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    // private activatedRoute: ActivatedRoute
  ) {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile().subscribe(res => {
      this.currentUser = res.user;
    });
  }

  ngOnInit(): void {

  }

}
