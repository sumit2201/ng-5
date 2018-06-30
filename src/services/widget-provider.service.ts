import { HttpClient } from "@angular/common/http";
import { Injectable, ComponentFactoryResolver } from "@angular/core";
import { RootScopeService } from "./rootscope-provider.service";
import { Globals, WidgetTypes } from "../common/global";
import { Validations } from "../common/utility";
import { RichTableComponent } from "../app/components/richTable/rich-table.component";
import { FormLoaderComponent } from "../app/components/formLoader/form-loader.component";

export const WebPagesNameConst = {
  TEAM: "team",
};
@Injectable()
export class WidgetProviderService {
  public widgetList: any[];
  constructor(private http: HttpClient, private global: Globals, private componentFactoryResolver:
    ComponentFactoryResolver) {

  }
  public getWidgetList(page: string) {
    let url = null;
    switch (page) {
      case WebPagesNameConst.TEAM:
        url = this.global.API_URLS.TeamPageWidgets;
        break;
      default:
        break;
    }
    if (!Validations.isNullOrUndefined(url)) {
      return this.http.get(url);
    }
  }

  public mapWidgetWithComponent(widgetDataObj) {
    let componentFactory;
    switch (widgetDataObj.name) {
      case WidgetTypes.Form:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormLoaderComponent);
        break;
      case WidgetTypes.RichTable:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(RichTableComponent);
        break;
      default:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(RichTableComponent);
        break;
    }
    return componentFactory;
  }
}
