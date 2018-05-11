import { Component } from "@angular/core";

@Component({
    selector: "my-form",
    templateUrl: "./forms.template.html",
})
export class FormsComponent {
    public isClicked = false;
    public newItem = null;
    public exampleJsonObject = {
        properties: {
            email: {
                type: "string",
                description: "email",
                format: "email"
            },
            password: {
                type: "string",
                description: "Password"
            },
            rememberMe: {
                type: "boolean",
                default: false,
                description: "Remember me"
            }
        },
        required: ["email", "password", "rememberMe"]
    };

    public items = [{ name: "Sumit" }, { name: "Neema" }];
    public onFormSubmit(data: any) {
        console.error(data);
    }

    public showInput() {
        this.isClicked = true;
    }

    public updateList() {
        const itemObj = {
            name: this.newItem,
        };
        this.items.push(itemObj);
        this.isClicked = false;
    }
}
