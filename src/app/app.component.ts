/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation, ElementRef } from "@angular/core";
import { environment } from "environments/environment";
import { AppState } from "./app.service";
import * as $ from "jquery";

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
  constructor(
    public appState: AppState, private appElement: ElementRef
  ) { }

  public ngOnInit() {
    // TODO
  }

  public onActivate() {
    $(this.appElement.nativeElement).find(".generic-workflow").show();
  }

  public onDeactivate() {
    $(this.appElement.nativeElement).find(".generic-workflow").hide();
  }

}
