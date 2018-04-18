import 'reflect-metadata';
import {Page as Metadata} from "../Services/Metadata/Page";


export var Page: any = View;
export interface IViewAnnotation {
    name? : string;

}
    export function View(...args:any[]): any {

        let  annotate :Function = (target: any, options: any = {}):void => {
            if (!options.tableName) options.name = target.name;
            options.instanceMethods = target.prototype;
            options.classMethods = target;
            Metadata.register(target.prototype, options);
            return;
        };


        if (args.length > 0) {
            if (typeof args[0] === "function") return annotate(args[0]);
            return (target:any) => annotate(target, (<any>Object).assign({}, args[0]));
        }
    }
