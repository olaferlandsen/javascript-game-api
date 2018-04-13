import {Debug} from "../Annotations/Debug";
import {IPage} from "./Interface/Page";
import {DashboardPage} from "../Public/Pages/Dashboard/Dashboard";
import {Dom} from "../Helpers/Dom";

@Debug
export class Root {
    @Debug
    protected id : string = "root";
    @Debug
    protected tagName : string = "game";
    @Debug
    protected pages : IPage[] = [];
    @Debug
    protected rootPage :IPage = DashboardPage;

    public constructor() {
        Dom.delete("#" + this.id); // remove if exist's
        Dom.find("body", e => e.appendChild(Dom.createTag(this.tagName, {
            id : this.id
        })));

        // generate pages
        for (let page of this.pages) Dom.find(this.tagName, e => e.appendChild(Dom.createTag(page.name)));
    }

    public static run ():Root {
        return new Root();
    }
}
