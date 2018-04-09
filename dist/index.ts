///<reference path='Character/Character.ts'/>
///<reference path='Scenario/Scenario.ts'/>
import Character = Game.Character.Character;
import Scenario = Game.Scenario.Scenario;

declare namespace Game {

}
/*
let names = [
    "John", "Paul", "Francis", "Xavier", "Ali"
];
let characters = [];
for (let name in names) {
    characters.push(new Character({
        name : names[name],
        gender : "male",
        _class : "y",
        life : {
            max : 100,
            current : 100
        }
    }));
}
*/

let scenarios = new Scenario();
scenarios.create("casa", {
    precipitation : 30,
    humidity : 10,
    temperature : 26,
    pressure : 15
});
let scenario = scenarios.get("casa");
console.log("Ambiental #" + i, scenario);

for (var i = 0; i < 10; i++) {
    scenarios.randomizeProfile("casa", 30, true);
    console.log("Ambiental #" + (i+1), scenario);
}

