
import {Page, Debug} from "./../../../Annotations/Annotations";
import {Scope, Navigation, IPage} from "./../../../Core/Core";

@Page
@Debug
export class DashboardPage implements IPage {
    public constructor (public scope : Scope, public navigation: Navigation) {

    }

    @Debug
    public viewDidLoad() {
        this.scope.name = "";
    }
}
