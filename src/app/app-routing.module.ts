import { ExperienceComponent } from "./dashboard/experience/experience.component";
import { EductaionComponent } from "./dashboard/eductaion/eductaion.component";
import { AuthGuard } from "./_helpers/auth.guard";
import { EditProfileComponent } from "./profile/edit-profile/edit-profile.component";
import { ProfilesComponent } from "./profiles/profiles.component";
import { ProfileComponent } from "./profile/profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], //Authguard
  },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'education', component: EductaionComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'profile', component: EditProfileComponent },
  { path: 'posts', component: PostsComponent },
  { path: '**', redirectTo: '' }, //Wrong Url
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
