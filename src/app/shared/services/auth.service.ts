import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CanActivate, Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  checkLoginStatus(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const status = localStorage.getItem('isLoggedIn');
      return status === 'true';
    }
    return false;
  }

  canActivate(): boolean {
    if (this.checkLoginStatus()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedIn.next(true);
    this.router.navigate(['/home/dashboard']);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
