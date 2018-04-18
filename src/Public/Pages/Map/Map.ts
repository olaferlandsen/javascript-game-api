
import {Page} from "../../../Annotations/Page";
import {Scope, Navigation, IPage} from "./../../../Core/Core";

@Page
export class MapPage implements IPage {
    public template : string = "";
    namespace : string = "MapPage";
    public constructor (public scope : Scope, public navigation: Navigation) {

    }

    public viewDidLoad() {
        this.scope.name = "";
    }
}
