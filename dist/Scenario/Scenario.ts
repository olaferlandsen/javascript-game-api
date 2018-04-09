///<reference path='../Helpers/Utils.ts'/>

namespace Game.Scenario {
    export interface IScenarioProfile {
        precipitation:number;
        temperature:number;
        pressure:number;
        humidity:number;
    }
    export class Scenario {
        private precipitation:number;
        private temperature:number;
        private pressure:number;
        private humidity:number;

        private profiles : {
            [key : string] : IScenarioProfile
        } = {};

        constructor (key?:string, profile?:IScenarioProfile) {
            if (key && profile) this.create(key, profile);
        }

        public get (key : string):IScenarioProfile {
            if (!(key in this.profiles)) return null;
            return this.profiles[key];
        }
        public create (key:string, profile:IScenarioProfile):boolean {
            if (key in this.profiles) return false;
            this.profiles[key] = profile;
            return true;
        }
        public update (key:string, profile:IScenarioProfile):boolean {
            if (!(key in this.profiles)) return false;
            this.profiles[key] = profile;
            return true;
        }

        public rendomize ():IScenarioProfile {
            return {
                humidity: Helpers.Utils.randomArbitrary(0, 100),
                precipitation: Helpers.Utils.randomArbitrary(0, 100),
                pressure:Helpers.Utils.randomArbitrary(0, 100),
                temperature: Helpers.Utils.randomArbitrary(0, 100)
            }
        }
        public randomizeProfile (key:string, percentage?:number, update?:boolean):IScenarioProfile {
            if (typeof percentage !== "number") {
                percentage = Number(percentage) || 20;
            }

            let profile:IScenarioProfile = this.get(key);
            if (!profile) return null;
            profile.temperature = Helpers.Utils.randomBetweenPercentageOf(profile.temperature, percentage);
            profile.pressure = Helpers.Utils.randomBetweenPercentageOf(profile.pressure, percentage);
            profile.humidity = Helpers.Utils.randomBetweenPercentageOf(profile.humidity, percentage);
            profile.precipitation = Helpers.Utils.randomBetweenPercentageOf(profile.precipitation, percentage);

            if (update === true) {
                this.update(key, profile);
            }
            return profile;
        }
    }
}
