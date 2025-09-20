import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Options, SimpleNotificationsModule} from "angular2-notifications";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'redsocial_FE';
  isLoggedIn: boolean = false;
  notificationOptions: Options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
