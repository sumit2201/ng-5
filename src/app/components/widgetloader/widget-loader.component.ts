import { Component, Input, ViewContainerRef, ViewChild } from "@angular/core";
import { WidgetProviderService } from "../../../services/widget-provider.service";
import { Globals, IWidgetItem } from "../../../common/global";
import { LoggerService, LogTypes } from "../../../services/log-provider.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "app-widget-loader",
  template: `<ng-template #dynamicWidgets></ng-template>`,
})
export class WidgetLoaderComponent implements OnInit {
  @ViewChild("dynamicWidgets", { read: ViewContainerRef }) private container;
  @Input() private widgets;
  @Input() private parameters;
  @Input() private metaInfo;
  private dynamicComponents: any;
  constructor(private widgetProvider: WidgetProviderService, private loggerService: LoggerService) {
  }
  public ngOnInit() {
    this.loadComponents(this.widgets);
  }

  private loadComponents(data: any) {
    this.dynamicComponents = data;
    for (const dynamicCmpDetail of this.dynamicComponents) {
      let componentFactory = this.widgetProvider.mapWidgetWithComponent(dynamicCmpDetail);
      let componentRef: any = this.container.createComponent(componentFactory);
      componentRef.instance.data = dynamicCmpDetail;
    }
  }
}
