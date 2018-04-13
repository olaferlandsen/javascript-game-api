import {Character} from "./Character";

export class Group {
    private name: string;
    private description: string;
    private characters : Character[];
    public constructor (characters ?: Character[]) {
        if (characters) {
            this.characters = characters;
        }
    }
    public setName (name: string):void {
        this.name = name;
    }
    public setDescription (description:string):void {
        this.description = description;
    }
    public addCharacter (character : Character):number {
        this.characters.push(character);
        return (this.characters.length-1);
    }
    public removeCharacter (index:number) {
        this.characters.slice(index, 1);
    }
    public updateCharacter (index:number, character : Character) {
        this.characters[index] = character;
    }
}
