export class InventoryItem {
    private name: string;
    private value: number;
    private weight: number;
    /**
     * Space/Size of item
     * @property
     * */
    private size: number;
    private type:string;
    private defense:number;
    private attack:number;

    constructor (options:any) {
        this.name = options.name;
        this.value = options.value;
        this.attack = options.attack;
        this.defense = options.defense;
    }
    /**
     * Get item weight
     * @return number
     * */
    getWeight ():number {
        return this.weight;
    }

    getSize () {
        return this.size;
    }
}
