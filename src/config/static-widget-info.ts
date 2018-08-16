import { IActionInfo } from "../common/interfaces";

export const STATICWIDGETS = {};

STATICWIDGETS["LOGIN"] = {
    name: "form",
    title: "Sign In",
    dataProvider: {
        type: "INLINE",
        data: [{
            schema: {
                title: "Sign In",
                fields: {
                    username: {
                        title: "User name",
                        type: "text"
                    },
                    password: {
                        title: "User name",
                        type: "text"
                    }
                }
            }
        }]
    }
};