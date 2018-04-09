///<reference path='Character/Character.ts'/>
var Character = Game.Character.Character;
var names = [
    "John", "Paul", "Francis", "Xavier", "Ali"
];
var characters = [];
for (var name_1 in names) {
    characters.push(new Character({
        name: name_1,
        gender: "male",
        _class: "y",
        life: {
            max: 100,
            current: 100
        }
    }));
}
