export class Scope {
    [key : string] : any;

    protected cound ():number {
        return Object.keys(this).length;
    }
}
