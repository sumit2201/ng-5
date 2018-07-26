import {
    Component,
    OnInit,
    Input
} from "@angular/core";
import { ActivatedRoute, ParamMap, Params } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../../../common/global";
import { Validations } from "../../../common/utility";
import { switchMap } from "rxjs/operators";
import { WidgetProviderService } from "../../../services/widget-provider.service";
import { Observable } from "rxjs/RX";
import { IWidgetInfo } from "../../../common/interfaces";

@Component({
    templateUrl: "./team-profile.template.html",
})
export class TeamProfileComponent implements OnInit {
    private widgets: { [key: string]: IWidgetInfo };
    private parameters: { [key: string]: string };
    constructor(
        public route: ActivatedRoute, private http: HttpClient, private global: Globals, private widgetProvider: WidgetProviderService,
    ) {
    }

    public ngOnInit() {
        // TODO: get route information with observers
        // const val = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) => {
        //         console.error(params.get("teamId"));
        //         return params.get("teamId");
        //     })
        // );
        this.parameters = {};
        this.route.queryParams.subscribe((params: Params) => {
            console.warn(params);
        });
        const widgetObserver = this.widgetProvider.getWidgetList("team");
        const routeObserver = this.route.queryParams;
        if (!Validations.isNullOrUndefined(widgetObserver)) {
            Observable.forkJoin(widgetObserver).subscribe((data: any[]) => {
                this.widgets = data[0];
                const teamId = this.route.snapshot.params["teamId"];
                this.parameters["teamId"] = teamId;
            }, () => {
                console.error("error occured");
            });
        }
    }

}
