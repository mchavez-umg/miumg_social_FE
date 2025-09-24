import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {PostService} from "../../services/post.service";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    DecimalPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  lengthUsers: number = 0;
  lengthPost: number = 0;
  lengthLikes: number = 0;

  constructor(private userService: UserService,
              private postService: PostService
  ) {
  }


    ngOnInit(): void {
      this.userService.getAllUsers().subscribe({
        next: data => {
          this.lengthUsers = data.length;
        }
      });
      this.postService.getAllPost().subscribe({
        next: data => {
          this.lengthPost = data.length;
        }
      });
      this.postService.getAllLikes().subscribe({
        next: data => {
          this.lengthLikes = data.length;
        }
      })
    }


}
