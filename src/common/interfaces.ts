export interface IWidgetInfo {
    title: string;
    dataProvider?: IActionInfo;
    metaType?: string; // TODO: change string to pre-define type 
}

export interface IActionInfo {
    type: string;
    method: string;
    url: string;
    dev_url?: string;
    parameters: IActionParameter[];
    data: any[];
}

export interface IActionParameter {
    id: string;
    title: string;
    isMendatory: boolean;
}

export type IParameterValueFormat = { [key: string]: string };

export const ActionTypes = {
    Rest: "REST",
    InlineData: "INLINE",
};

export const LogTypes = {
    Error: "ERROR",
    Info: "INFO",
    Warn: "WARN",
};

export type IMetaInfoFormat =  { [key: string]: IMetaInfo };

export interface IMetaInfo {
    isVisible?:boolean;
    type: string; // data type values
    actionInfo: IActionInfo[];
}

export interface IWidgetToggleSettings {
    label: string;
    imageUrl: string;
    widgetInfo: IWidgetInfo;
}