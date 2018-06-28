import {
    Component,
    OnInit,
    Input
} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../../../common/global";
import { switchMap } from "rxjs/operators";
import { WidgetProviderService, IWidgetInfo } from "../../../services/widget-provider.service";

@Component({
    templateUrl: "./team-profile.template.html",
})
export class TeamProfileComponent implements OnInit {
    private widgets: { [key: string]: IWidgetInfo };
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
        const widgetObserver = this.widgetProvider.getWidgetList("team");
        if (!Validations.isNullOrUndefined(widgetObserver)) {
            widgetObserver.subscribe((res: { [key: string]: IWidgetInfo }) => {
                this.widgets = res;
            }, () => {
                // TODO error log
            });
        }
        const val1 = this.route.snapshot.params["teamId"];
        console.error(val1);
    }

}
