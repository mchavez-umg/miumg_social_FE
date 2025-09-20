import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuTrigger,
    RouterLink,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  width = 0;
  isMobile: boolean = false;

  constructor() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.isMobile = event.target.innerWidth < 1025;
  }

  checkScreenSize(width: number): void {
    this.isMobile = width < 1025;
  }

  ngOnInit() {
    this.width = window.innerWidth;
    this.checkScreenSize(this.width);
  }

  logout(): void {
    console.log('Cerrar Sesión')
  }
}
