import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./../dashboard.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
