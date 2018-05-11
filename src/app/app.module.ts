import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from "environments/environment";
import { ROUTES } from "./app.routes";
// App is our top level component
import { AppComponent } from "./app.component";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState, InternalStateType } from "./app.service";
import { HomeComponent } from "./home";
import { AboutComponent } from "./components/about/about.component";
import { SideBarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { WorkFlowPopupComponent } from "./workflow-popup.component";
import { NoContentComponent } from "./no-content";
import { XLargeDirective } from "./home/x-large";
import { DevModuleModule } from "./+dev-module";
import { JsonSchemaFormModule } from "angular2-json-schema-form";
import { MaterialDesignFrameworkModule } from "angular2-json-schema-form";

import { MatMenuModule, MatButtonModule, MatCardModule, MatSidenavModule, MatListModule } from "@angular/material";
import "../styles/styles.scss";
import "../styles/headings.css";
import { FormsComponent } from "./components/forms/forms.component";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  entryComponents: [FormsComponent],
  declarations: [
    AppComponent,
    AboutComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
    WorkFlowPopupComponent,
    FormsComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule, MaterialDesignFrameworkModule,
    JsonSchemaFormModule.forRoot(MaterialDesignFrameworkModule),
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule { }
