import {
  Component,
  OnInit,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../../../common/global";

@Component({
  templateUrl: "./about.component.html",
})
export class AboutComponent implements OnInit {
  @Input() public heading: any;
  public localState: any;
  public schema: any;
  public formData: any;
  constructor(
    public route: ActivatedRoute, private http: HttpClient, private global: Globals
  ) {
    // this.heading = "test";
  }

  public ngOnInit() {
    this.http.get(this.global.API_URLS.SampleForm).subscribe(
      (data: any) => {
        console.error(data);
        this.schema = data.schema;
        this.formData = data.model;
      },
      (error) => {
        console.error(error);
      }
    );
    this.route
      .data
      .subscribe((data: any) => {
        /**
         * Your resolved data from route.
         */
        this.localState = data.yourData;
      });
  }
}
