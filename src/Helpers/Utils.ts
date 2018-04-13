export class Utils {
    static getType (value:any):string {
        return typeof value;
    }
    static isFunction (value:any):boolean {
        return typeof value === 'function';
    }
    static isObject (value:any):boolean {
        return null != value && toString.call(value) === '[object Object]';
    }
    static isArray (value:any):boolean {
        if (Array.isArray) return Array.isArray(value);
        return value instanceof Array;
    }
    static isEmpty (value:any):boolean {
        if (Utils.isNull(value) || Utils.isUndefined(value)) return true;
        else if (Utils.isArray(value) || Utils.isString(value) ) return value.length === 0;
        else if (Utils.isObject(value)) return Object.keys(value).length === 0;
        else if (Utils.isNumber(value)) return value === 0;
        return false;
    }
    static isEmptyObject (value:any) {
        return Utils.isObject(value) && Object.keys(value).length === 0 || value === null;
    }
    static isString (value:any):boolean {
        return typeof value === 'string'
    }
    static isInteger (value:any):boolean {
        return typeof value === 'number' && Number(value) === value && value % 1 === 0;
    }
    static isFloat (value:any):boolean {
        return typeof value === 'number' && Number(value) === value && value % 1 !== 0;
    }
    static isNumber (value:any):boolean {
        return Utils.isInteger(value) || Utils.isFloat(value)
    }
    static isTrue (value:any):boolean {
        return value === true || value === 1
    }
    static isFalse (value:any):boolean {
        return value === false || value === 0
    }
    static isRegExp (value:any):boolean {
        return value instanceof RegExp;
    }
    static isDate (value:any):boolean {
        return value instanceof Date;
    }
    static isNull (value:any):boolean {
        return value === null;
    }
    static isUndefined (value:any):boolean {
        return typeof value === 'undefined'
    }
    static forEach(value:any, callback:Function) {
        if (Utils.isArray(value)) {
            for (let index = 0; index < value.length; index++) {
                let item = value[index];
                callback.call({}, item, index);
            }
        }
        else if (Utils.isObject(value)) {
            for (let property in value) {
                if (value.hasOwnProperty(property) ) {
                    callback.call({}, value[property], property)
                }
            }
        }
    }
    static random (value:any, _max?:number):any  {
        let max = (typeof _max !== "number") ? 0 : _max;
        if (Utils.isArray(value)) {
            return value[Math.floor(Math.random()*value.length)];
        }
        else if (Utils.isNumber(value)) {
            if (!Utils.isNumber(max)) {
                max = value + Math.floor( Math.random() * value );
            }
            return Math.floor( Math.random() * max ) + value;
        }
    }


    static randomArbitrary (min:number, max:number):number {
        return Math.random() * (max - min) + min;
    }


    static randomBetweenPercentageOf (value:number, percentage:number) {
        if (percentage > 0) {
            percentage = percentage * 0.01;
        }
        let range : number = value * percentage;
        let max : number = value + range;
        let min : number = max - (range * 2);
        if (max === min) {
            return max;
        }
        return Utils.randomArbitrary(min, max);
    }

    static hasOwnProperty (properties:any, object:Object):boolean {
        if (!this.isObject(object)) throw new Error('Helpers:hasOwnProperty: only accept object');
        if (this.isArray(properties)) {
            for (let property of properties) {
                if (!object.hasOwnProperty(property)) return false;
            }
            return true;
        }
        else if (Utils.isString(properties)) {
            return object.hasOwnProperty(properties);
        }
        return false;
    }
}
