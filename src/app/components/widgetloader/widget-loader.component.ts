import { Component, Input, ViewContainerRef, ViewChild, SimpleChange, ComponentRef } from "@angular/core";
import { WidgetProviderService } from "../../../services/widget-provider.service";
import { Globals, IWidgetItem } from "../../../common/global";
import { LoggerService } from "../../../services/log-provider.service";
import { OnInit, OnChanges, SimpleChanges } from "@angular/core/src/metadata/lifecycle_hooks";
import { Validations } from "../../../common/utility";
import { DataProviderService } from "../../../services/data-provider.service";
import { IWidgetInfo, LogTypes } from "../../../common/interfaces";

@Component({
  selector: "app-widget-loader",
  template: `<ng-template #dynamicWidgets></ng-template>`,
})
export class WidgetLoaderComponent implements OnInit {
  @ViewChild("dynamicWidgets", { read: ViewContainerRef }) private container;
  @Input() private widgets: IWidgetInfo[];
  @Input() private parameters;
  @Input() private metaInfo;
  private dynamicComponents: any;
  constructor(private widgetProvider: WidgetProviderService, private logger: LoggerService, private dataProvider: DataProviderService) {
  }

  public ngOnInit() {
    this.loadComponents();
  }

  private loadComponents() {
    for (const dynamicCmpDetail of this.widgets) {
      let componentFactory = this.widgetProvider.mapWidgetWithComponent(dynamicCmpDetail);
      let componentRef: ComponentRef = this.container.createComponent(componentFactory);
      this.loadData(componentRef, dynamicCmpDetail);
      // componentRef.instance.widgetData = dynamicCmpDetail;
      // componentRef.parameters = this.parameters;
    }
  }

  private loadData(componentRef: any, widgetInfo: IWidgetInfo) {
    if (!Validations.isNullOrUndefined(widgetInfo)) {
      const data = this.dataProvider.getData(widgetInfo.dataProvider, this.parameters);
      if (!Validations.isNullOrUndefined(data)) {
        data.subscribe((res: any) => {
          // let componentRef: any = this.container.createComponent(componentFactory);
          componentRef.instance.widgetData = res;
          componentRef.changeDetectorRef.detectChanges()
        }, () => {
          this.logger.logMessage("error in fetching data in widget Loader component after load data call", LogTypes.Error);
        });
      } else {
        this.logger.logMessage("no data found in widget Loader component after load data call", LogTypes.Error);
        this.logger.logMessage(widgetInfo.dataProvider, LogTypes.Error);
      }
    } else {
      this.logger.logMessage("no widget data found in widget Loader component in load data", LogTypes.Error);
    }
  }
}
