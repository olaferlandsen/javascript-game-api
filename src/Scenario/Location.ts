export class Location {
    public name:number;
    public x:number;
    public y:number;
    public icons = {
        default : ''
    };


    constructor (options: any) {
        if ('name' in options) this.name = options.name;
        if ('x' in options) this.x = options.x;
        if ('y' in options) this.y = options.y;
    }
}
