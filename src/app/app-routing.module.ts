import { ExperienceComponent } from './dashboard/experience/experience.component';
import { EductaionComponent } from './dashboard/eductaion/eductaion.component';
import { AuthGuard } from './_helpers/auth.guard';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBlogsComponent } from './admin/all-blogs/all-blogs.component';
import { AddBlogComponent } from './admin/add-blog/add-blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], //Authguard
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard] },
  {
    path: 'education',
    component: EductaionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'experience',
    component: ExperienceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'posts', component: AllBlogsComponent, canActivate: [AuthGuard] },
  { path: 'posts/new', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: AddBlogComponent, canActivate: [AuthGuard] },
  {
    path: 'posts/view/:id',
    component: BlogDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' }, //Wrong Url
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
