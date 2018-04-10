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


let max = 20;
let scenario = new Scenario(max, max);


let table : any = scenario.fetch();


let map = document.getElementById("map");
map.style.width = (42.2* max) + "px";
map.style.height = (44 * max) + "px";

for (let row in table) {
    let rowElement = document.createElement("div");
    rowElement.style.display = "block";
    rowElement.style.border= "1px solid red";
    rowElement.style.overflow= "auto";
    rowElement.style.margin= "0";
    rowElement.style.padding= "0";
    rowElement.style.position= "relative";

    for (let col in table[row]) {
        let item = table[row][col];
        console.log("item", item);

        let cell = document.createElement("div");
        cell.style.display = "block";
        cell.style.border = "1px solid black";
        cell.style.width = "40px";
        cell.style.height = "40px";
        cell.style.cssFloat = "left";
        cell.style.position = "relative";
        if (item.deleted) cell.style.opacity = "0.4";
        cell.id = item.key;
        cell.onclick = (e) => {
            alert([
                "Nombre             :" + item.name,
                "Key                :" + item.key,
                "X                  :" + item.x,
                "Y                  :" + item.y,
                "Eliminado          :" + (item.deleted ? 'si' : 'no'),
                "CLIMA:",
                "Presion atmosferica:" + item.climate.pressure,
                "Presipitaciones    :" + item.climate.precipitation,
                "Temperatura        :" + item.climate.temperature ,
                "Humedad            :" + item.climate.humidity
            ].join("\n"));
        };

        for (let location of item.locations) {
            let loc = document.createElement("div");
            loc.style.position = "absolute";
            loc.style.left = location.x.toString();
            loc.style.top = location.y.toString();
            loc.style.width = "5px";
            loc.style.height = "5px";
            loc.style.display= "block";
            loc.style.border = "black";
            loc.style.backgroundColor= "red";
            loc.title = location.name;
            loc.onclick = () => alert(["x:" + location.x.toString(), "y:"+location.y.toString()].join("\n"));
            cell.appendChild(loc);
        }

        rowElement.appendChild(cell);
    }

    console.log("map", map);
    map.appendChild(rowElement);
}


