export interface IWidgetInfo {
    title: string;
    dataProvider?: IActionInfo;
}

export interface IActionInfo {
    type: string;
    method: string;
    url: string;
    dev_url?: string;
    parameters: IActionParameter[];
}

export interface IActionParameter {
    id: string;
    title: string;
    isMendatory: boolean;
}

export type IParameterValueFormat = { [key: string]: string };

export const ActionTypes = {
    Rest: "rest",
    InlineData: "inlineData",
};

export const LogTypes = {
    Error: "ERROR",
    Info: "INFO",
};
