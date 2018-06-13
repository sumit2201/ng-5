import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from "environments/environment";
import { ROUTES } from "./app.routes";
// App is our top level component
import { AppComponent } from "./app.component";
import { AppState, InternalStateType } from "./app.service";
import { HomeComponent } from "./home";
import { AboutComponent } from "./components/about/about.component";
import { SideBarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NoContentComponent } from "./no-content";
import { XLargeDirective } from "./home/x-large";
import { Globals } from "../common/global";

import { MatMenuModule, MatButtonModule, MatCardModule, MatSidenavModule, MatListModule } from "@angular/material";
import "../styles/styles.scss";
import "../styles/headings.css";
import { DynamicFormsModule } from "modules/forms/forms.modules";

// Application wide providers
const APP_PROVIDERS = [
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
  declarations: [
    AppComponent,
    AboutComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    DynamicFormsModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    Globals,
  ]
})
export class AppModule { }
