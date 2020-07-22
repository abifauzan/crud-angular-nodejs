import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./../dashboard.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private titleService: Title,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  doLogout() {
    if (confirm('Are you sure?')) {
      this.authService.doLogout();
    }

  }

}
