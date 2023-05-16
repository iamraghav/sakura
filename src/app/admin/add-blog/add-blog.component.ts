import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from 'src/app/_services/blog.service';
import { FeatureimageService } from 'src/app/_services/featureimage.service';
import { TagComponent } from 'src/app/material/components/tag/tag.component';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { AlertDialogBodyComponent } from './../../alert-dialog-body/alert-dialog-body.component';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/_services';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent {
  public selectedFile: File;
  public preview_image: any;
  public tags: [];
  public title: string;
  public content: string;
  public blog_id: string;
  public show_spinner: boolean = false;
  @ViewChild(TagComponent, { static: false }) childReference: any;
  subs: Subscription[] = [];
  user: any;
  blogID = null;
  editMode = false;

  constructor(
    private image_service: FeatureimageService,
    private blog_service: BlogService,
    private authService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private routes: ActivatedRoute
  ) {
    this.routes.paramMap.subscribe((map: any) => {
      this.blogID = map?.params?.id || null;
    });
    this.getCurrentUser();
    if (this.blogID) {
      this.editMode = true;
      this.show_spinner = true;
      this.blog_service
        .get_single_blog(this.blogID)
        .subscribe((blogData: any) => {
          console.log('blogData:', blogData);
          this.preview_image = blogData.featureImage.url;
          this.title = blogData.name;
          this.content = blogData.text;
        });
      this.show_spinner = false;
    }
  }

  ngAfterViewInit() {
    this.tags = this.childReference.tags;
  }

  processFile(imageInput: any) {
    this.selectedFile = imageInput.files[0];
    this.previewImageLoad();
  }

  previewImageLoad() {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.preview_image = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  open_dialog(message: string) {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '550px',
      height: '300px',
      data: {
        message,
      },
    });
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.submit_blog();
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

  async submit_blog() {
    try {
      this.show_spinner = true;

      let blog = {
        name: this.title,
        text: this.content,
        tags: [],
        avatar: this.user.av,
        userid: this.user.id,
        username: this.user.name,
      };

      this.tags.map((element) => {
        blog.tags.push(element['name']);
      });

      this.blog_service.add_blog(blog).subscribe((response: any) => {
        this.blog_id = response._id;
        this.open_alert_dialog(
          `Blog has been created with the id: ${this.blog_id}`
        );
        this.title = '';
        this.content = '';
        this.preview_image = '';
        this.tags = [];
        this.image_service
          .upload_image(this.selectedFile, this.blog_id)
          .subscribe((res) => console.log(res));
        this.router.navigate(['/posts']);
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.show_spinner = false;
    }
  }

  quillConfiguration = QuillConfiguration;

  getCurrentUser() {
    this.subs.push(
      this.authService.getCurrentUser().subscribe((user) => {
        this.user = user;
        this.user.av = `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`;
      })
    );
  }
}

export const QuillConfiguration = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],
};
