import { IActionInfo } from "../common/interfaces";

export const STATICWIDGETS = {};

STATICWIDGETS["LOGIN"] = {
    name: "form",
    title: "Sign In",
    dataProvider: {
        type: "INLINE",
        data: {
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
                },
                actions: [{
                    title: "Sign In",
                    type: "rest",
                    method: "post",
                    url: "",
                    dev_url: "./config/dummyServer/callhandler.php",
                    parameters: [
                        {
                            id: "username",
                            isMendatory: true
                        },
                        {
                            id: "password",
                            isMendatory: true
                        }
                    ]
                }]
            }
        }
    }
};