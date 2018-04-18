import {Page as Metadata} from '../Services/Metadata/Page';
import {Scope} from "./Scope";
export class Navigation {
    private current : string;
    private elements : { [key : string] : {
        constructor : Function|null,
            document : Element|null
    }} = {};
    public constructor (components?:Function[]) {
        if (Array.isArray(components)) {
            for (let component of components) this.add(component);
        }
        this.current = this.getFirst();
    }

    public getFirst ():string {
        return Object.keys(this.elements)[0]
    }

    public exists (component : string):boolean {
        return component in this.elements;
    }
    public initilize (component: string, element : Element) {
        if (!this.exists(component)) {
            console.log("no existe:" + component);
            return null;
        }
        console.log("inicializado: ", component);
        let classComponent = (new (this.elements[component].constructor as Function).prototype.constructor(new Scope(element), this));
        return component;
    }
    public list ():string[] {
        return Object.keys(this.elements);
    }
    public add (page: Function):number {
        if (!(page.name in this.elements)) {
            this.elements[page.name]= {constructor : null, document : null};
        }
        this.elements[page.name].constructor = page;
        return (Object.keys(this.elements).length-1);
    }
    public count () : number {
        return Object.keys(this.elements).length;
    }
    public hasPrev (index?: number):boolean {
        if (typeof index !== "number") index = this.getCurrentIndex();
        return index > 0 && (index - 1) > 0;
    }
    public hasNext (index ?: number):boolean {
        if (typeof index !== "number") {
            index = this.getCurrentIndex();
        }
        let count = this.count();
        return (index +1) <= count;
    }
    public getNextIndex ():number {
        if (this.hasNext()) return this.getCurrentIndex() +1;
        return this.getCurrentIndex();
    }
    public getPrevIndex ():number {
        if (this.hasPrev()) return this.getCurrentIndex()-1;
        return this.getCurrentIndex();
    }
    public goToNext ():string {
        return this.goToIndex(this.getNextIndex());
    }
    public goToPrev ():string {
        return this.goToIndex(this.getPrevIndex());
    }
    public goToFirst():string{
        return this.goToIndex(1);
    }
    public goToLast ():string {
        return this.goToIndex(this.count()-1);
    }
    public getCurrentIndex ():number {
        let result : number = 0;
        if (typeof this.current !== "string") return result;
        let elements : string [] = this.list();
        for (let index: number = 0; index < elements.length; index++) {
            if (elements[index] === this.current) {
                result = index;
                break;
            }
        }
        return result;
    }
    public goToIndex (index:number):string {
        let list : string[] = this.list();
        if (typeof list[index] === "string") {
            this.current = list[index];
            return list[index];
        }
        throw new Error("Compoanent don't exists");
    }
    public goTo(component:string):number {
        let list : string[] = this.list();
        let index : number = 0;
        for (let i :number = 0; i < list.length; i++) {
            if (component === list[i]) {
                index = i;
                break;
            }
        }
        return index;
    }
}
