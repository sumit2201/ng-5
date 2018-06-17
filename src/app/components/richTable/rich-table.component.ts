import {
    Component,
    OnInit,
    Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../../../common/global";

@Component({
    templateUrl: "./rich-table.template.html",
})
export class RichTableComponent implements OnInit {
    constructor(
        public route: ActivatedRoute, private http: HttpClient, private global: Globals
    ) {
    }

    public ngOnInit() {

    }

}
