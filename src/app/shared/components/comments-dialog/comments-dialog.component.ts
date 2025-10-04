import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {HttpErrorResponse} from "@angular/common/http";
import {PostService} from "../../services/post.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-comments-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatList, MatListItem, MatListItemLine, MatListItemTitle, MatIcon, DatePipe, MatTooltip],
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.scss'
})
export class CommentsDialogComponent {

  constructor(
    private service: PostService,
    private notifications: NotificationsService,
    public dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onDelete(itemSelected: any) {
    this.service.deleteComment(itemSelected).subscribe({
      next: data => {
        this.notifications.success('Operación Exitosa', data);
        this.dialogRef.close('success');
      }, error: (error: HttpErrorResponse) => {
        this.notifications.error('Error', error.message);
      }
    })
  }
}
