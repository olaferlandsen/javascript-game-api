
import {Page} from "../../../Annotations/Page";
import {Scope, Navigation, IPage} from "./../../../Core/Core";

@Page
export class DashboardPage implements IPage {
    public namespace : string = "DashboardPage";

    public static template : string = "Dashboard.html";

    public constructor (public scope : Scope, public navigation : Navigation) {
        console.log("DashboardPage")

        console.log("scope:", this.scope)
        console.log("navigation:", this.navigation)


        console.log("getCurrentIndex:", this.navigation.getCurrentIndex());
        console.log("getNextIndex:", this.navigation.getNextIndex());


        this.navigation.goToNext();
        console.log("goToNext:", this.navigation.getCurrentIndex());

    }
    public viewDidEnter () {
        console.log("viewDidEnter")
    }
    public viewDidLoad() {
        console.log("viewDidLoad")
    }

    public viewWillEnter () {
        console.log("viewWillEnter")

    }
    public viewWillLoad () {
        console.log("viewDidEnter")
    }

}
