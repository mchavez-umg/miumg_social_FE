import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MatTooltipModule} from "@angular/material/tooltip";
import {SearchBasicComponent} from "../search-basic/search-basic.component";
import {MatLineModule} from "@angular/material/core";
import {NgClass} from "@angular/common";
import {NotificationsService} from "angular2-notifications";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Calificacion} from "../../interfaces/calificacion";
import {CalificacionService} from "../../services/calificacion.service";

@Component({
  selector: 'app-calificaciones',
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
  templateUrl: './calificaciones.component.html',
  styleUrl: './calificaciones.component.scss'
})
export class CalificacionesComponent implements OnInit{
  list: Calificacion[];
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
  constructor(private formBuilder: FormBuilder,
              private service: CalificacionService,
              private notifications: NotificationsService) {
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      nota: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.title = 'Agregar';
    this.getCalificaciones();
  }

  getCalificaciones() {
    this.service.getCalificacion().subscribe({
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
    //this.reload();
  }

  clearSearch() {
    this.formSearch.reset();
    this.formSearch.get('search')?.setValue('');
    this.page = 0;
    this.itemSelected = -1;
    //this.reload();
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.itemSelected !== -1) {
        this.service.updateCalificacion(this.itemSelected, this.form.value).subscribe({
          next: data => {
            this.notifications.success('Actualizado exitosamente', data.nota);
            this.getCalificaciones();
            this.resetForm();
          }, error: (error: HttpErrorResponse) => {
            this.notifications.error('Error', error.message);
          }
        });
      } else {
        this.service.saveCalificacion(this.form.value).subscribe({
          next: data => {
            this.notifications.success('Agregado exitosamente', data.nota);
            this.getCalificaciones();
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

  }

  loadForm(itemSelected: Calificacion) {
    this.title = 'Guardar';
    this.itemSelected = itemSelected.id;
    this.form.setValue({
      nombre: itemSelected.nombre,
      nota: itemSelected.nota,
    });
  }

  onDelete(itemSelected: Calificacion) {
    this.service.deleteCalificacion(itemSelected.id).subscribe({
      next: data => {
        this.getCalificaciones();
        this.notifications.success('Operación Exitosa', data);
      }, error: (error: HttpErrorResponse) => {
        this.notifications.error('Error', error.message);
      }
    })
  }

}
