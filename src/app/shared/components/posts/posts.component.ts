import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {MatListModule} from "@angular/material/list";
import {SearchBasicComponent} from "../search-basic/search-basic.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatLineModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DatePipe, NgClass} from "@angular/common";
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Publicacion} from "../../interfaces/publicacion";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-posts',
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
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatCardTitle,
    MatCardImage,
    MatCardActions
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [
    DatePipe
  ]
})
export class PostsComponent implements OnInit, OnDestroy {
  list: Publicacion[];
  formSearch: FormGroup;
  form: FormGroup;
  page: number;
  itemSelected: number | undefined = -1;
  subscriptionRoute: Subscription;
  subscriptionService: Subscription;
  queryCount: number;
  title: string = '';
  imagePath: any;

  constructor(private service: PostService,
              private notifications: NotificationsService,
              private route: Router,
              private _sanitizer: DomSanitizer,
              private datePipe: DatePipe) {
    this.formSearch = new FormGroup({
      search: new FormControl('')
    });
    this.form = new FormGroup({
      description: new FormControl(''),
      image: new FormControl(''),
      publicationDate: new FormControl(''),
    });
  }

  ngOnInit() {
    this.title = 'Detalle';
    this.getPost();
  }

  getPost() {
    this.service.getAllPost().subscribe({
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

  loadForm(itemSelected: Publicacion) {
    this.itemSelected = itemSelected.id;
    this.service.getPostById(this.itemSelected).subscribe({
      next: (data: any) => {
        this.imagePath = 'data:image/jpeg;base64,' + data.image;
        this.form.patchValue({
          description: data.description,
          publicationDate: this.datePipe.transform(data.publicationDate, "dd/MM/yyyy HH:mm:ss")
        });
      }
    })

  }

}
