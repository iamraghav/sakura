import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observer, Subscription } from 'rxjs';
import { UserService } from '../_services';
import { IPost, PostsService } from '../_services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnDestroy {
  subs: Subscription[] = [];
  posts: any[] = [];
  user: any;
  canLikePost: boolean = true;
  message = '';
  expanded = false;

  constructor(
    private authService: UserService,
    private postService: PostsService
  ) {
    this.getCurrentUser();
    this.getPost();
  }

  getCurrentUser() {
    this.subs.push(
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.user.av = `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`;
      })
    );
  }

  getPost() {
    this.subs.push(
      this.postService.getAllPosts().subscribe(async (posts: any) => {
        console.log('posts:', posts);
        this.posts = posts;
      })
    );
  }

  postMessage(): void {
    const val = this.message;
    const postData = {
      text: val,
      name: val,
      avatar: this.user.av,
      userid: this.user.id,
      username: this.user.name,
    };
    this.postService.postMessage(postData).subscribe((response) => {
      this.getPost();
    });
    this.message = '';
  }

  ngOnDestroy(): void {
    this.subs = [];
  }

  like(_id: string) {
    const currPost = this.posts.find((post) => post._id === _id);
    const userLiked = currPost.likes.some((like) => like.user === this.user.id);
    if (!userLiked)
      this.postService.postLike(_id).subscribe((response) => {
        this.getPost();
      });
  }
}
