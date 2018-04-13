export interface IDomProperties {
    [key : string] : any;
}

export class Dom {
    public static one = Dom.find;
    public static element = Dom.find;
    public static elements = Dom.findAll;
    public static all = Dom.findAll;
    public static remove = Dom.delete;
    public static removeAttr = Dom.removeAttribute;
    public static addAttr = Dom.addAtrribute;
    public static attrs = Dom.attributes;
    public static classes = Dom.classList;
    public static append = Dom.appendTo;
    public static prepend = Dom.preprendTo;

    public static on = Dom.bind;
    public static registerElement = Dom.createTag;


    public static createTag (tagName : string, properties ? : IDomProperties):Element {
        let element : Element = (document as any).registerElement(tagName, {
            prototype : Object.create(HTMLElement.prototype)
        });
        if (typeof properties === "object" && !Array.isArray(properties) && properties !== null) {
            for (let property in properties) element[property] = properties[property];
        }
        return element;
    }
    public static createElement (tagName: string, properties?: IDomProperties ):Element {
        let element : Element = document.createElement(tagName);
        if (typeof properties === "object" && !Array.isArray(properties) && properties !== null) {
            for (let property in properties) element[property] = properties[property];
        }
        return element;
    }
    public static exists (selector : string|Element) :boolean {
        if (selector instanceof Element) return true;
        return (Dom.findAll(selector as string) as NodeListOf<Element>).length > 0
    }
    public static find (selector:string, callback ?: (element: Element) => void ):Element|any {
        let element : Element = document.querySelector(selector) as Element;
        if (element !== null && typeof callback !== "undefined") return callback.apply(null, [element]);
        return element;
    }
    public static findAll (selector:string, callback ?: (element: Element) => void ):NodeListOf<Element>|null {
        let elements : NodeListOf<Element> = document.querySelectorAll(selector) as NodeListOf<Element>;
        if (elements !== null && typeof callback !== "undefined") callback.apply(null, [elements]);
        return elements;
    }
    public static delete (selector : string|Element):void {
        if (selector instanceof Element) ((selector as Element).parentNode as Node).removeChild(selector);
        else Dom.find(selector, e => (e.parentNode as Node).removeChild(e))
    }
    public static copy (selector: string|Element) {
        if (selector instanceof Element) return selector.cloneNode(true);
        else return Dom.find(selector);
    }
    public static clone (selector:Element|string, target:Element|string) {
        let copy : Element = Dom.copy(selector) as Element;
        if (!copy) throw new Error(":target: element don't exists");
        if (target instanceof Element) target.appendChild(copy as Element);
        else Dom.find(selector as string, e => e.appendChild(copy as Element))
    }
    public static appendTo (selector : string|Element, target:string|Element) {

    }
    public static preprendTo () {
    }

    public static addClass (selector : string|Element, className : string):void {
        if (selector instanceof Element) selector.classList.add(className);
        else Dom.find(selector, e => e.classList.add(className));
    }

    public static removeClass (selector : string|Element, className : string) {
        if (selector instanceof Element) selector.classList.remove(className);
        else Dom.find(selector, e => e.classList.remove(className));
    }
    public static classList (selector : Element|string):string[] {
        let list : string [] = [];
        if (selector instanceof Element) {
            for (let className in selector.classList) list.push(className);
            return list;
        }
        else return Dom.find(selector, e => {
            let list : string[] = [];
            for (let className in e.classList) list.push(className);
            return list;
        });
    }

    public static attributes() {}
    public static removeAttribute() {}
    public static addAtrribute() {}

    public static moveTo() {}

    public static bind (selector : string | Element, event : string, callback : (...args:any[]) => void) {
        let alternatives : {[key: string] : string} = {
            'click' : "onclick",
            'blclick' : "ondblclick",
            'doubleclick' : "ondblclick",
            'twoclick' : "ondblclick",
            'paste' : "onpaste"
        };
        event = String(event).replace(/\s+/,'').trim().toLowerCase();
        if (event in alternatives) event = alternatives[event];
        Dom.find(selector as string, e => e.addEventListener(event, callback));
    }

}
