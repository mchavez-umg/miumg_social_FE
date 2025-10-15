import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
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
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Publicacion} from "../../interfaces/publicacion";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {CommentsDialogComponent} from "../comments-dialog/comments-dialog.component";
import {MatIconButton} from "@angular/material/button";

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
    MatCardImage,
    MatIconButton,

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
  commentsLength: number = 0;
  likesLength: number = 0;
  comments: any[] = [];

  constructor(private service: PostService,
              private notifications: NotificationsService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
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
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.loadForm(+id);

    }
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

  clearSearch() {
    this.formSearch.reset();
    this.formSearch.get('search')?.setValue('');
    this.page = 0;
    this.getPost();
    this.resetForm();
  }

  onSubmitSearch() {
    this.resetForm();
    let description = this.formSearch.value;
    this.service.searchPost(description.search).subscribe({
      next: data => {
        this.list = data;
        this.queryCount = data.length;
      }
    });
  }

  resetForm() {
    this.form.reset();
    this.itemSelected = -1;
    this.likesLength = 0;
    this.commentsLength = 0;
    this.imagePath = null;
  }

  loadForm(itemSelected: number | undefined) {
    this.itemSelected = itemSelected;
    this.service.getPostById(this.itemSelected).subscribe({
      next: (data: any) => {
        this.countLikes();
        this.getComments();
        this.imagePath = data.image;
        this.form.patchValue({
          description: data.description,
          publicationDate: this.datePipe.transform(data.publicationDate, "dd/MM/yyyy HH:mm:ss")
        });
      }
    })

  }

  countLikes() {
    this.service.getCountlikes(this.itemSelected).subscribe({
      next: (data: any) => {
        this.likesLength = data;
      }
    })
  }

  getComments() {
    this.service.getCommentsByPublication(this.itemSelected).subscribe({
      next: (data: any) => {
        this.comments = data;
        this.commentsLength = data.length;
      }
    });
  }

  openDialogComments() {
   let dialogRef = this.dialog.open(CommentsDialogComponent, {
      data: this.comments,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getComments();
      }
    })
  }

  onDelete(itemSelected: any) {
    this.service.deletePost(itemSelected.id).subscribe({
      next: data => {
        this.resetForm();
        this.getPost();
        this.notifications.success('Operación Exitosa', data);
      }, error: (error: HttpErrorResponse) => {
        this.notifications.error('Error', error.message);
      }
    })
  }

}
