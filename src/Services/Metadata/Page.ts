export class Page {


    static readonly KEYS = {
        PAGE       : 'metadata:page'
    };



    public static register (target:any, options : any) {
        console.log(target);
        Reflect.defineMetadata(Page.KEYS.PAGE, options, target);
    }
    public static get (target:any) {
        return Reflect.getMetadata(Page.KEYS.PAGE, target);
    }

    public static list ():any {
        return Reflect.getMetadataKeys(this, Page.KEYS.PAGE);
    }
}
