import {Utils} from "../Helpers/Utils";

export interface IClimateProfile {
    precipitation:number;
    temperature:number;
    pressure:number;
    humidity:number;
}
export class Climate {
    public precipitation:number;
    public temperature:number;
    public pressure:number;
    public humidity:number;


    constructor () {
        this.generate(true);
    }
    public generate (update?:boolean):IClimateProfile {
        let climate = {
            humidity: Utils.randomArbitrary(0, 100),
            precipitation: Utils.randomArbitrary(0, 100),
            pressure:Utils.randomArbitrary(0, 100),
            temperature: Utils.randomArbitrary(0, 100)
        };
        if (update === true) {
            this.humidity = climate.humidity;
            this.precipitation = climate.precipitation;
            this.pressure = climate.pressure;
            this.temperature = climate.temperature;
        }
        return climate;
    }
    public randomize (percentage?:number, update?:boolean):IClimateProfile {
        if (typeof percentage !== "number") {
            percentage = Number(percentage) || 20;
        }
        let climate = {
            humidity: this.humidity,
            precipitation: this.precipitation,
            pressure: this.pressure,
            temperature: this.temperature
        };
        climate.temperature = Utils.randomBetweenPercentageOf(climate.temperature, percentage);
        climate.pressure = Utils.randomBetweenPercentageOf(climate.pressure, percentage);
        climate.humidity = Utils.randomBetweenPercentageOf(climate.humidity, percentage);
        climate.precipitation = Utils.randomBetweenPercentageOf(climate.precipitation, percentage);
        if (update === true) {
            this.humidity = climate.humidity;
            this.precipitation = climate.precipitation;
            this.pressure = climate.pressure;
            this.temperature = climate.temperature;
        }
        return climate;
    }
}
