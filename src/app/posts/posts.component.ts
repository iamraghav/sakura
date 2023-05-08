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
  canLikePost: boolean = false;

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
        this.user.av = `https://api.dicebear.com/6.x/adventurer/svg?seed=${user.id}`;
      })
    );
  }

  getPost() {
    this.subs.push(
      this.postService.getAllPosts().subscribe(async (posts: any) => {
        this.posts = posts;
      })
    );
  }

  postMessage(form: NgForm): void {
    const val: { message: string } = form.value;
    console.log(this.user);
    const postData = {
      text: val.message,
      name: val.message,
      avatar: this.user.av,
      userid: this.user.id,
      username: this.user.name,
    };
    this.postService.postMessage(postData).subscribe((response) => {
      this.getPost();
    });
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.subs = [];
  }

  like(_id: string) {
    const currPost = this.posts.find((post) => post.user === this.user.id);
    console.log('currPost:', currPost);
    if (currPost)
      this.postService.postLike(_id).subscribe((response) => {
        this.getPost();
      });
  }
}
