export class Scope {
    [key : string] : any;
    protected count ():number {
        return Object.keys(this).length;
    }

    public constructor (public element : Element) {

    }
}
