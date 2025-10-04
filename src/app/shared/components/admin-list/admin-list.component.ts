import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchBasicComponent} from "../search-basic/search-basic.component";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatLineModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {NgClass, NgForOf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {NotificationsService} from "angular2-notifications";
import {HttpErrorResponse} from "@angular/common/http";
import {Admin} from "../../interfaces/admin";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    MatListModule,
    SearchBasicComponent,
    MatPaginatorModule,
    MatIconModule,
    MatLineModule,
    MatTooltipModule,
    MatIconButton,
    NgClass,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatCardHeader,
    MatCardSubtitle,
    MatMiniFabButton,
  ],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss'
})
export class AdminListComponent implements OnInit, OnDestroy {
  list: Admin[];
  isNew: boolean;
  isEdit: boolean;

  formSearch: FormGroup;
  form: FormGroup;
  page: number;
  itemSelected: number | undefined = -1;
  subscriptionRoute: Subscription;
  subscriptionService: Subscription;
  queryCount: number;
  title: string = '';

  constructor(private service: AdminService,
              private notifications: NotificationsService) {
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>_\\-]).{6,}$')]),
    });
  }

  ngOnInit() {
    this.title = 'Agregar';
    this.getAdministradores();
  }

  getAdministradores() {
    this.service.getAdministradores().subscribe({
      next: data => {
        this.list = data;
        this.queryCount = data.length;
      }, error: (error: HttpErrorResponse) => {
        this.notifications.error('Error', error.message);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptionRoute) {
      this.subscriptionRoute.unsubscribe();
    }
    if (this.subscriptionService) {
      this.subscriptionService.unsubscribe();
    }
  }

  onPageChange(event: any) {
    this.page = +event.pageIndex;
  }

  clearSearch() {
    this.formSearch.get('search')?.setValue('');
    this.page = 0;
    this.getAdministradores();
    this.resetForm();
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.itemSelected !== -1) {
        this.service.updateAdministrador(this.itemSelected, this.form.value).subscribe({
          next: data => {
            this.notifications.success('Actualizado exitosamente', data.username);
            this.getAdministradores();
            this.resetForm();
          }, error: (error: HttpErrorResponse) => {
            this.notifications.error('Error', error.message);
          }
        });
      } else {
        this.service.saveAdministrador(this.form.value).subscribe({
          next: data => {
            this.notifications.success('Agregado exitosamente', data.username);
            this.getAdministradores();
            this.resetForm();
          }, error: (error: HttpErrorResponse) => {
            this.notifications.error('Error', error.message);
          }
        });
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.itemSelected = -1;
    this.title = 'Agregar';
  }

  onSubmitSearch() {
    this.resetForm();
    let username = this.formSearch.value;
    this.service.searchAdmin(username.search).subscribe({
      next: data => {
        this.list = data;
        this.queryCount = data.length;
      }
    });
  }

  loadForm(itemSelected: Admin) {
    this.title = 'Guardar';
    this.itemSelected = itemSelected.id;
    this.form.setValue({
      username: itemSelected.username,
      password: itemSelected.password,
    });
  }

  onDelete(itemSelected: Admin) {
    this.service.deleteAdministrador(itemSelected.id).subscribe({
      next: data => {
        this.getAdministradores();
        this.notifications.success('Operación Exitosa', data);
      }, error: (error: HttpErrorResponse) => {
        this.notifications.error('Error', error.message);
      }
    })
  }

}
