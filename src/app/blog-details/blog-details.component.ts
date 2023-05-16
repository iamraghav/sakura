import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../_services/blog.service';

interface Blog {
  name: string;
  text: string;
  featureImage: { url: string };
  tags: string[];
  date: string;
  username: string;
}

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent {
  constructor(private routes: ActivatedRoute, private blogSvc: BlogService) {
    this.routes.paramMap.subscribe((map: any) => {
      console.log('map:', map);
      this.blogID = map?.params?.id || null;
    });

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
}
