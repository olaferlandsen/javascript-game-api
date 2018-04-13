export interface IDiseasesScenario {
    precipitation:{
        max : number,
        min : number
    },
    temperature:{
        max : number,
        min : number
    };
    pressure:{
        max : number,
        min : number
    };
    humidity:{
        max : number,
        min : number
    };
}
export interface IDiseases {
    name : string;
    scenario : IDiseasesScenario
}
export class Diseases {
    public create () {}
    public get () {}
    public update () {}
    public remove () {}
}

