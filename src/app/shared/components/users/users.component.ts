import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SearchBasicComponent} from "../search-basic/search-basic.component";
import {MatLineModule} from "@angular/material/core";
import {NgClass} from "@angular/common";
import {Subscription} from "rxjs";
import {Usuario} from "../../interfaces/usuario";
import {NotificationsService} from "angular2-notifications";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {Publicacion} from "../../interfaces/publicacion";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatListModule,
    SearchBasicComponent,
    MatPaginatorModule,
    MatIconModule,
    MatLineModule,
    MatTooltipModule,
    NgClass,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardHeader,
    MatCardSubtitle,
    MatSlideToggle,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit  {
  list: Usuario[];
  formSearch: FormGroup;
  form: FormGroup;
  page: number;
  itemSelected: number | undefined = -1;
  statusItemSelected: number | undefined = -1;
  subscriptionRoute: Subscription;
  subscriptionService: Subscription;
  queryCount: number;
  title: string = '';
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: UserService,
              private notifications: NotificationsService) {
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      status: new FormControl(0, Validators.required),
      username: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.title = 'Detalle';
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.service.getAllUsers().subscribe({
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
    this.formSearch.reset();
    this.formSearch.get('search')?.setValue('');
    this.page = 0;
    this.itemSelected = -1;
  }

  onSubmitSearch() {

  }

  loadForm(itemSelected: Usuario) {
    this.itemSelected = itemSelected.id;
    this.statusItemSelected = itemSelected.status;
    this.form.patchValue(itemSelected);
  }

  changeStatus(event: any) {
    let status = event.checked ? 1 : 0
    let payload = {...this.form.value, status: status};
    this.service.updateUser(this.itemSelected, payload).subscribe({
      next: data => {
        this.getUsers();
        this.loadForm(data)
      }
    });
  }

}
