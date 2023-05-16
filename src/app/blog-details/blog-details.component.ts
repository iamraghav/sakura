import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../_services/blog.service';
import { PostsService } from '../_services/posts.service';
import { UserService } from '../_services';

interface Blog {
  name: string;
  text: string;
  featureImage: { url: string };
  tags: string[];
  date: string;
  username: string;
  _id?: string;
  likes?: []
}

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent {
  constructor(private routes: ActivatedRoute, private blogSvc: BlogService, private postService: PostsService, private authService: UserService) {
    this.routes.paramMap.subscribe((map: any) => {
      console.log('map:', map);
      this.blogID = map?.params?.id || null;
    });
    this.getCurrentUser();
    this.getBlogDetails();
  }

  getBlogDetails() {
    this.blogSvc.get_single_blog(this.blogID).subscribe((res: Blog) => {
      this.blog_props = res;
    });
  }

  blogID: string;
  blog_props: Blog = {
    name: '',
    text: '',
    featureImage: { url: '' },
    tags: [],
    date: '',
    username: '',
  };

  user
  subs = []

  like(_id: string) {
    // const userLiked = currPost.likes.some((like) => like.user === this.user.id);
    const userLiked = this.blog_props.likes.some((like: any) => like.user === this.user.id)
    if (!userLiked)
      this.postService.postLike(_id).subscribe((response) => {
        this.getBlogDetails()
      });
  }

  getCurrentUser() {
    this.subs.push(
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.user.av = `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`;
      })
    );
  }
}
