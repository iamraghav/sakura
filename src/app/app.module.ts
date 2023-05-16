import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileComponent } from './profile/profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EductaionComponent } from './dashboard/eductaion/eductaion.component';
import { ExperienceComponent } from './dashboard/experience/experience.component';
import { PostsComponent } from './posts/posts.component';
import { MaterialModule } from './shared/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AddBlogComponent } from './admin/add-blog/add-blog.component';
import { AdminComponent } from './admin/admin.component';
import { TagComponent } from './material/components/tag/tag.component';
import { AlertDialogBodyComponent } from './alert-dialog-body/alert-dialog-body.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { MatChipsModule } from '@angular/material/chips';
import { AllBlogsComponent } from './admin/all-blogs/all-blogs.component';
import { QuillModule } from 'ngx-quill';
import { RouterModule } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { HtmlSanitizerPipe } from './_helpers/html-sanitizer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfilesComponent,
    ProfileComponent,
    EditProfileComponent,
    NavbarComponent,
    FooterComponent,
    EductaionComponent,
    ExperienceComponent,
    PostsComponent,
    AddBlogComponent,
    AdminComponent,
    TagComponent,
    AlertDialogBodyComponent,
    DialogBodyComponent,
    AllBlogsComponent,
    BlogDetailsComponent,
    HtmlSanitizerPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatBadgeModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    RichTextEditorAllModule,
    MatChipsModule,
    QuillModule.forRoot(),
  ],

  entryComponents: [DialogBodyComponent, AlertDialogBodyComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
