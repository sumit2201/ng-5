export class Validations {
    public static isNullOrUndefined(value: any) {
        if (value === null || value === undefined) {
            return true;
        }
        return false;
    }
}