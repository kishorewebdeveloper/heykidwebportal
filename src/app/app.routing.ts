import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { OldComponent } from "./old/old.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignupComponent } from "./signup/signup.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ServicesComponent } from "./services/services.component";
import { ProjectDetailComponent } from "./projectDetail/projectDetail.component";

import { GalleryComponent } from "./gallery/gallery.component";
import { ContactComponent } from "./contact/contact.component";
import { JoinventuresComponent } from "./joinventures/joinventures.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { NavbarComponent } from "./shared/navbar/navbar.component";

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: "register", component: SignupComponent },
  { path: "home", component: LandingComponent },
  {
    path: '',
    // component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "old", component: OldComponent },
      { path: "user-profile", component: ProfileComponent },
     
      { path: "login", component: LoginComponent },
      { path: "about", component: AboutComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "services/:serviceType", component: ServicesComponent },
      { path: "projectDetail/:projectId", component: ProjectDetailComponent },    
      { path: "gallery", component: GalleryComponent },
      { path: "contact", component: ContactComponent },
      { path: "joinventures", component: JoinventuresComponent },    
      { path: "", redirectTo: "home", pathMatch: "full" },
    ]
  }, 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
