

export function Page(...page:any[]): any {
    console.log("page:", page);
    return (...args:any[]) => {
        console.log("any:", args);
        //Game.Services.Metadata.Page.register();
    }
}
