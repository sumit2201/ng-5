import { Component, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { WidgetProviderService } from '../../../services/widget-provider.service';
import { Globals, IWidgetItem } from '../../../common/global';
import { LoggerService, LogTypes } from '../../../services/log-provider.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-widget-loader', // <my-app></my-app>
  template: `<ng-template #dynamicWidgets></ng-template>`,
})
export class WidgetLoaderComponent implements OnInit {
  @Input() position;
  dynamicComponents: any;
  constructor(private widgetProvider: WidgetProviderService, private loggerService: LoggerService) {
  }
  ngOnInit() {
    const widgetProviderObservable = this.widgetProvider.getWidgetList();
    widgetProviderObservable.subscribe((res: IWidgetItem[]) => {
      this.loadComponents(res);
    }, (err: any) => {
      this.loggerService.logMessage("Failed to load widget", LogTypes.Error);
    })
  }

  @ViewChild("dynamicWidgets", { read: ViewContainerRef }) container;


  loadComponents(data: any) {
    this.dynamicComponents = data;
    for (let i = 0; i < this.dynamicComponents.length;
      i++) {
      const dynamicCmpDetail = this.dynamicComponents[i];
      let componentFactory = this.widgetProvider.mapWidgetWithComponent(dynamicCmpDetail);
      let componentRef: any = this.container.createComponent(componentFactory);
      componentRef.instance.data = dynamicCmpDetail;
    }
  }

}