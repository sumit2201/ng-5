/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from "environments/environment";
import { AppState } from "./app.service";

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: "app",
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    "./app.component.scss"
  ],
  templateUrl: "./app.template.html",
})
export class AppComponent implements OnInit {
  public name = "Angular Starter";
  public tipe = "assets/img/tipe.png";
  public twitter = "https://twitter.com/gdi2290";
  public url = "https://tipe.io";
  public showDevModule: boolean = environment.showDevModule;
  public showPopup = true;
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log("Initial App State", this.appState.state);
  }

}
