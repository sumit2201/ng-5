import { HttpClient } from '@angular/common/http';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { RootScopeService } from './rootscope-provider.service';
import { Globals, WidgetTypes } from '../common/global';
import { RichTableComponent } from '../app/components/richTable/rich-table.component';
import { FormLoaderComponent } from '../app/components/formLoader/form-loader.component';

@Injectable()
export class WidgetProviderService {
  public widgetList: any[];
  constructor(private http: HttpClient, private global: Globals, private componentFactoryResolver:
    ComponentFactoryResolver) {

  }
  public getWidgetList() {
    return this.http.get(this.global.API_URLS.SampleWidgets);
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