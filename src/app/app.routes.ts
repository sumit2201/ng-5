import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { AboutComponent } from "./components/about/about.component";
import { NoContentComponent } from "./no-content";
import { TeamProfileComponent } from "./components/teamProfile/team-profile.component";


export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "createteam", component: HomeComponent },
  { path: "teamprofile/:teamId", component: TeamProfileComponent },
  { path: "register-tournament", component: HomeComponent, outlet: "genericFlow" },
  { path: "register-tournament-confirm", component: AboutComponent, outlet: "genericFlow" },
  { path: "**", component: NoContentComponent }];
