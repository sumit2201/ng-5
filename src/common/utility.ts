import { IElementPosition } from "./interfaces";
import * as $ from "jquery";

export class Validations {
    public static isNullOrUndefined(value: any) {
        if (value === null || value === undefined) {
            return true;
        }
        return false;
    }

    public static isArray(arr: any) {
        // TODO
        return true;
    }

    public static isObjectEmpty(obj: any) {
        let isEmpty = true;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                isEmpty = false;
                break;
            }
        }
    }
}

export class UIHelper {
    public static getAbsoluteCoordsForElement($elem: JQuery) {
        const offsetElement = $elem.offset();
        return {
            x: offsetElement.left,
            y: offsetElement.top,
        };
    }

    public static adjustPositionAsPerWindow(currentPosition: IElementPosition, $elem: JQuery) {
        const offsetElement = $elem.offset();
        const totalWidth = UIHelper.getAvailableWidth();
        const totalHeight = UIHelper.getAvailableHeight();
        const elementWidth = $elem.outerWidth();
        const elementHeight = $elem.outerHeight();
        let newX = currentPosition.x;
        if (currentPosition.x + elementWidth > totalWidth) {
            newX = totalWidth - elementWidth;
        }
        let newY = currentPosition.y;
        if (currentPosition.y + elementHeight > totalHeight) {
            newY = totalHeight - elementHeight;
        }
        return {
            x: newX,
            y: newY,
        };
    }

    public static setPosition(currentPosition: IElementPosition, $elem: JQuery) {
        $elem.css({
            top: currentPosition.y,
            left: currentPosition.x,
        });
    }

    public static getAvailableWidth() {
        return $("body").width();
    }

    public static getAvailableHeight() {
        return $("body").height();
    }
}
