import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: string;

  constructor(
    private router: Router,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Agri Permata | Dashboard');
  }

}
