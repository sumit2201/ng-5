import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { AboutComponent } from "./components/about/about.component";
import { NoContentComponent } from "./no-content";


export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "createteam", component: HomeComponent },
  { path: "**",    component: NoContentComponent },
];
