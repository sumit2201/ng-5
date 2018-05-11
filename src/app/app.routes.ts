import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { AboutComponent } from "./components/about/about.component";
import { NoContentComponent } from "./no-content";
import { FormsComponent } from "./components/forms";


export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "createteam", component: FormsComponent },
  { path: "**",    component: NoContentComponent },
];
