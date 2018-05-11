/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, AfterViewInit, ViewChildren, ComponentFactoryResolver, ViewContainerRef, QueryList, ElementRef, TemplateRef, ViewChild } from "@angular/core";
/**
 * App Component
 * Top Level Component
 */
import { FormsComponent } from "./components/forms/forms.component";
@Component({
  selector: "workflow-popup",
  styleUrls: [
    "./popup.component.css"
  ],
  template: `<ng-template #dynamic></ng-template>`
})
export class WorkFlowPopupComponent implements AfterViewInit {
  @ViewChild("dynamic", { read: ViewContainerRef }) public widget;
  // @ViewChild('tpl') private tpl: TemplateRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  public ngAfterViewInit() {
    this.loadComponent();
  }
  public loadComponent() {
    console.error(this.widget);
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormsComponent);
    let componentRef = this.widget.createComponent(componentFactory);
  }
}
