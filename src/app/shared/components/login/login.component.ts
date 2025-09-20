import {Component, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationsService} from "angular2-notifications";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInput,
    MatIconButton,
    RouterLink,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService,
              private authService: AuthService,
              private notifications: NotificationsService) {
  }

  hide = signal(true);
  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    let username = this.form.controls.username.value;
    let password = this.form.controls.password.value;
    this.userService.login(username, password).subscribe({
      next: (data: any) => {
        if (data) {
          this.authService.login();
        }
      }, error: (err: HttpErrorResponse) => {
        this.notifications.error('Error', 'usuario o contraseña incorrectos');
      }
    })
  }

}
