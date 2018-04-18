import {IPage} from "./Interface/Page";
import {DashboardPage} from "../Public/Pages/Dashboard/Dashboard";
import {Dom} from "../Helpers/Dom";
import {Page} from "../Services/Metadata/Page";
import {MenuPage} from "../Public/Pages/Menu/Menu";
import {MapPage} from "../Public/Pages/Map/Map";
import {Navigation} from "./Navigation";
import {File} from "../Helpers/File";
import {Scope} from "./Scope";

export class Root {
    protected id : string = "root";
    protected tagName : string = "game";

    protected components = (new Navigation([
        DashboardPage,
        MenuPage,
        MapPage
    ]));

    public constructor() {
        Dom.delete("#" + this.id); // remove if exist's
        Dom.find("body", e => e.appendChild(Dom.createElement(this.tagName, {id : this.id})));
        // generate component
        for (let component of this.components.list()) {
            Dom.find(this.tagName, e => {
                let name = component.replace("Page", "");
                let element = Dom.createElement(component
                    .replace(/\.?([A-Z]+)/g, (x, y:string) => "-" + y.toLowerCase())
                    .replace(/^-/, "") +"-component", {
                    className : ["game-panel"],
                    template : name + ".html",
                    component : component
                });
                File.read("./dist/Public/Pages/" + name + "/" + name + ".html").toPromise().then((html) => {
                    html = Dom.parse(html);

                    let initialized = this.components.initilize(component, html);



                    element.appendChild( html );
                }, (error:any) => {
                    console.log("error", error)
                });
                e.appendChild(element)
            });
        }
    }
}
