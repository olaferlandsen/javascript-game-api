export interface IPage {
    [key: string]: any;

    //template : string;

    tagName? : string;

    viewDidLoad ? (): void;
    viewWillLoad ? (): void;

    viewDidEnter ?(): void;
    viewWillEnter ?(): void;

    viewDidLeave ?(): void;
    viewWillLeave ?(): void;

    viewDidDestroy ?(): void;
    viewWillDestroy ?(): void;

    viewDidUnload ?(): void;
    viewWillUnload ?(): void;

    viewDidUnload ?(): void;
    viewWillUnload ?(): void;
}
