///<reference path='../Helpers/Utils.ts'/>
///<reference path='Location.ts'/>
///<reference path='Climate.ts'/>

namespace Game.Scenario {
    import Utils = Game.Helpers.Utils;

    export interface IScenarioSpace {
        name : string
        climate : any
        key : string
        description : string,
        deleted ?: boolean,
        x: number,
        y:number,
        locations: Location[]
    }
    export class Scenario {
        private width: number;
        private height: number;
        private spaces  : Array<IScenarioSpace[]> = [];

        public constructor (width : number, height?: number) {
            if (typeof width === "number") {
                this.width = width;
                if (typeof height !== "number") {
                    this.height = width;
                }
                else {
                    this.height = height;
                }
                this.process(width, height);
            }
        }

        public process (width : number, height : number) {

            for (let row = 0; row < height; row++) {
                let cells : IScenarioSpace[] = [];
                for (let col = 0; col < width; col++) {
                    let locations = [];
                    for (let l = 0; l < Math.random()+2; l++) {
                        locations.push(new Location({
                            name : "Location " + row + col + l,
                            x : Utils.randomArbitrary(0, 35),
                            y : Utils.randomArbitrary(0, 35)
                        }));
                    }
                    cells.push(<IScenarioSpace>{
                        name : null,
                        description: null,
                        deleted : false,
                        x : row,
                        y : col,
                        key : (row+"_"+col),
                        climate : new Climate(),
                        locations : locations
                    });
                }
                this.spaces.push(cells);
            }
        }




        public fetch ():Array<IScenarioSpace[]> {
            return this.spaces;
        }
    }
}
