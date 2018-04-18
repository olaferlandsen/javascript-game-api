import {Utils} from "./Utils";

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
    public static replacement : { [key : string] : string} = {
        "className" : "class"
    };
    public static on = Dom.bind;

    public static createElement (tagName: string, properties?: IDomProperties ):Element {
        let element : Element = document.createElement(tagName);
        if (typeof properties === "object" && !Array.isArray(properties) && properties !== null) {
            for (let property in properties) {
                let value : any = properties[property];
                property = (property.toLowerCase() === "classname") ? "class": property;
                if (Array.isArray(value)) value = value.join(" ");
                if (/^data-*/i.test(property)) {
                    Dom.data(element , property, value);
                }
                else {
                    element.setAttribute(property, value);
                }
            }
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

    public static attributes(selector: string|Element) {
    }
    public static removeAttribute() {}
    public static addAtrribute() {}


    public static data (selector: Element|string, key ?: string, value?: string):any {
        let dataset : any = null;
        let element : Element = selector as Element;
        if (selector instanceof Element) {
            dataset = (selector as HTMLElement).dataset;
        } else {
            element = Dom.find(selector as string);
        }

        if (element) dataset = (element as HTMLElement).dataset;
        if (typeof key !== "undefined" && dataset) {
            key = key.replace(/^data-*/i, '');
            if (typeof value !== "undefined") {
                (selector as HTMLElement).dataset[Utils.toCamelCase(key)] = value;
                return;
            }
            else return dataset[Utils.toCamelCase(key)];
        }
        return dataset;
    }



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


    public static parse (html:string):HTMLElement {

        let element = Dom.createElement("layer");
        element.insertAdjacentHTML("beforeend", html);
        return element as HTMLElement;
        /*
        if (typeof DOMParser !== "undefined") {
            return (new DOMParser()).parseFromString(text, "text/html");
        }
        else {
            let frame = document.createElement('iframe') as HTMLIFrameElement;
            frame.style.display = 'none';
            document.body.appendChild(frame);
            (frame.contentDocument as Document).open();
            (frame.contentDocument as Document).write(text);
            (frame.contentDocument as Document).close();
            let el = (frame.contentDocument as Document).body.firstChild;
            document.body.removeChild(frame);
            return el as Element;
        }
        */
    }

}
