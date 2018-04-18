import {IPage, Navigation, Scope} from "../../../Core/Core";
import {Page} from "../../../Annotations/Page";

@Page
export class MenuPage implements IPage {

    public template : string = "";
    public constructor (public scope : Scope, public navigation: Navigation) {

    }

    public viewDidLoad() {
        this.scope.name = "";
    }
}
