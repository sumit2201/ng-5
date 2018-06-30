import { Component, Input, ViewContainerRef, ViewChild, SimpleChange } from "@angular/core";
import { WidgetProviderService } from "../../../services/widget-provider.service";
import { Globals, IWidgetItem } from "../../../common/global";
import { LoggerService} from "../../../services/log-provider.service";
import { OnInit, OnChanges, SimpleChanges } from "@angular/core/src/metadata/lifecycle_hooks";
import { Validations } from "../../../common/utility";

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
    this.loadComponents();
  }

  private loadComponents() {
    for (const dynamicCmpDetail of this.widgets) {
      let componentFactory = this.widgetProvider.mapWidgetWithComponent(dynamicCmpDetail);
      let componentRef: any = this.container.createComponent(componentFactory);
      componentRef.instance.widgetData = dynamicCmpDetail;
    }
  }
}
