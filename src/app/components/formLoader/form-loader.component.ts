import {
    Component,
    OnInit,
    Input
  } from "@angular/core";
  import { ActivatedRoute } from "@angular/router";
  import { HttpClient } from "@angular/common/http";
  import { Globals } from "../../../common/global";
  
  @Component({
    templateUrl: "./form-loader.template.html",
  })
  export class FormLoaderComponent implements OnInit {
    public schema: any;
    public formData: any;
    constructor(
      public route: ActivatedRoute, private http: HttpClient, private global: Globals
    ) {
    }

    public ngOnInit(){

    }
  
  }
  