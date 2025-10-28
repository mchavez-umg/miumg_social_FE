import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {NotificationsService} from "angular2-notifications";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-users-like-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatList, MatListItem, MatListItemLine, MatListItemTitle, MatIcon, DatePipe, MatTooltip],
  templateUrl: './users-like-dialog.component.html',
  styleUrl: './users-like-dialog.component.scss'
})
export class UsersLikeDialogComponent implements OnInit{
  infolikes: any[] = [];
  constructor(
    private service: PostService,
    private notifications: NotificationsService,
    public dialogRef: MatDialogRef<UsersLikeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
        this.service.getInfoLikesByPublication(this.data).subscribe({
          next: (data) => {
            this.infolikes = data
          }
        })
    }


}
