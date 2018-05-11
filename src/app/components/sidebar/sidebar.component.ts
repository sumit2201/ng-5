import {
    Component,
    OnInit,
    Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-side-bar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.style.scss"],
})
export class SideBarComponent implements OnInit {
    @Input() public heading: any;
    public localState: any;
    constructor(
        public route: ActivatedRoute
    ) {
        // this.heading = "test";
    }

    public ngOnInit() {
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
