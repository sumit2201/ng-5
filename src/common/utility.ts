export class Validations {
    public static isNullOrUndefined(value: any) {
        if (value === null || value === undefined) {
            return true;
        }
        return false;
    }

    public static isArray(arr: any){
        // TODO
        return true;
    }

    public static isObjectEmpty(obj: any){
        let isEmpty = true;
        for(const key in obj){
            if(obj.hasOwnProperty(key)){
                isEmpty = false;
                break;
            }
        }
    }
}