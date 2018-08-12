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
  templateUrl: "./widget-loader.template.html",
})
export class WidgetLoaderComponent implements OnInit {
  @ViewChild("dynamicWidgets", { read: ViewContainerRef }) private container;
  @Input() private widget: IWidgetInfo;
  @Input() private parameters;
  @Input() private metaInfo;
  private dynamicComponents: any;
  constructor(private widgetProvider: WidgetProviderService, private logger: LoggerService, private dataProvider: DataProviderService) {
  }

  public ngOnInit() {
    this.loadComponents();
  }

  private loadComponents() {
      let componentFactory = this.widgetProvider.mapWidgetWithComponent(this.widget);
      this.loadData(componentFactory,  this.widget);
  }

  private loadData(componentFactory: any, widgetInfo: IWidgetInfo) {
    if (!Validations.isNullOrUndefined(widgetInfo)) {
      const data = this.dataProvider.getData(widgetInfo.dataProvider, this.parameters,widgetInfo.metaType);
      if (!Validations.isNullOrUndefined(data)) {
        data.subscribe((res: any) => {
          // TODO: settting of instance data directly does not gurantee it reaches in ngOnInit of component all the time
          let componentRef: any = this.container.createComponent(componentFactory);
          componentRef.instance.widgetData = res;
          // componentRef.changeDetectorRef.detectChanges();
        }, (err: any) => {
          this.logger.logMessage("error in fetching data in widget Loader component after load data call", LogTypes.Error);
          this.logger.logMessage(err, LogTypes.Error);
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
