import { AlertDialogBodyComponent } from './../../alert-dialog-body/alert-dialog-body.component';
import { DialogBodyComponent } from 'src/app/dialog-body/dialog-body.component';
import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from 'src/app/_services/blog.service';
import { UserService } from 'src/app/_services';
import { Router } from '@angular/router';

interface Blog {
  name: string;
  content: string;
  featureImage: { url?: string };
  tags: [];
  id: string;
  userid: string;
  date: string;
  username: string;
}

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss'],
})
export class AllBlogsComponent {
  public blogs: Array<Blog> = [];
  public deleted_blog_id: string;
  public show_spinner: boolean = false;
  public user = null;
  subs = [];
  currentBlogId: string = null;
  constructor(
    private blog_service: BlogService,
    private dialog: MatDialog,
    private authService: UserService,
    private router: Router
  ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.subs.push(
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.user.av = `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`;
      })
    );
  }

  ngOnInit() {
    this.load_all_blogs();
  }

  load_all_blogs() {
    this.blog_service.get_all_blogs().subscribe((blog: any) => {
      console.log('blog:', blog);
      this.blogs = blog;
    });
  }

  open_dialog(message: string, blog_id: string): void {
    let dialogRef = this.dialog.open(DialogBodyComponent, {
      data: {
        message,
      },
      width: '550px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.delete_single_blog(blog_id);
      }
    });
  }

  open_alert_dialog(message: string) {
    let dialogRef = this.dialog.open(AlertDialogBodyComponent, {
      width: '550px',
      height: '300px',
      data: {
        message,
      },
    });
  }

  delete_single_blog(blog_id: string) {
    this.show_spinner = true;
    this.blog_service.delete_blog(blog_id).subscribe((response) => {
      if (response) {
        this.show_spinner = false;
        this.open_alert_dialog('The blog was successfully deleted');
      }
    });
  }

  navigateToEdit(props) {
    this.router.navigate([`/posts/${props._id}`]);
  }

  delete(blog) {
    this.open_dialog('Are you sure you want to delete this blog?', blog._id);
  }

  navigateToUserProfile(id) {
    this.router.navigate([`profile/${id}`]);
  }

  navigateToDetails(blog) {
    this.router.navigate([`posts/view/${blog._id}`]);
  }
}
