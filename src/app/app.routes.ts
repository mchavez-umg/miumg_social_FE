import { Routes } from '@angular/router';
import {LoginComponent} from "./shared/components/login/login.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {AuthService} from "./shared/services/auth.service";
import {AdminListComponent} from "./shared/components/admin-list/admin-list.component";
import {UsersComponent} from "./shared/components/users/users.component";
import {PostsComponent} from "./shared/components/posts/posts.component";
import {CalificacionesComponent} from "./shared/components/calificaciones/calificaciones.component";
import {DashboardComponent} from "./shared/components/dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthService],
    children: [
      { path: 'admin', component: AdminListComponent, canActivate: [AuthService] },
      { path: 'users', component: UsersComponent, canActivate: [AuthService] },
      { path: 'posts', component: PostsComponent, canActivate: [AuthService] },
      { path: 'calificaciones', component: CalificacionesComponent, canActivate: [AuthService] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
