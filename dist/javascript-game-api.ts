interface Array<T> {
    random(): T | undefined;
}
interface Number{
    random  :any;
    isNumber:any;
}

/**
 * Get random item from array
 *
 * @return {*}
 * */
Array.prototype.random  = function ():Array<any> {
    let values = this;
    return values[Math.floor(Math.random()*values.length)];
};
/**
 * Check if a number(float or integer) value
 * @param {*} value
 * @return boolean
 * */
function isNumber (value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
}
/**
 *
 * @param {int} min
 * @return number
 * */
Number.prototype.random = function (min:number) {
    let max  = this;
    if (!isNumber(max)) max = 1;
    if (!isNumber(min)) min = 0;
    return Math.floor( Math.random() * max ) + min;
};
/**
 * Class to create Items
 * @constructor
 * */
class Item {
    private name: string;
    private value: number;
    private size: number;
    private type:string;
    private defense:number;
    private attack:number;
    constructor (options) {
        this.name = options.name;
        this.value = options.value;
        this.attack = options.attack;
        this.defense = options.defense;
    }

}
/**
 * Class to manage items on invantary
 * @constructor
 * */
class Inventory {
    private gold:number;
    constructor     ()  {}
    getItems        ()  {}
    removeItem      ()  {}
    sellItem        ()  {}
    buyItem         ()  {}
}
/**
 * Class to manage players
 * @constructor
 * */
class Person {
    private name    :string;
    private level   :number;
    private gender  :any;
    private _class  :string;
    private life    :any;
    private defense :number;
    private attack  :number;
    private critical:number;
    private speed   :number;
    private ammunition:number;
    private image   :any;
    private exp     :number;
    private gold    :number;
    private items   :any;
    constructor         (info: any) {
        this.life = {
            current :   0,
            max     :   0
        };

        if (info.hasOwnProperty('name'))     this.setName(info.name);
        if (info.hasOwnProperty('gender'))   this.setGender(info.gender);
        if (info.hasOwnProperty('_class'))   this.setClass(info._class);

        //this.setLife(info.life || 0);
        this.setLife(info.life.max || 0);
        this.setMaxLife(info.life.current || 0);

        this.setAttack(info.attack || 0);
        this.setDefense(info.defense || 0);
        this.setCritical(info.critical || 0);
        this.setAmmunition(info.ammunition || Infinity);
        this.setExperience(info.experience || 0);
        this.setGold(info.gold || 0);
        this.setSpeed(info.speed || 0);
        this.setLevel(Math.max(1, info.level) || 1); // min level is 1
        if (info.hasOwnProperty('image'))    this.setImage(info.image);
        if (info.hasOwnProperty('items'))    this.setItems(info.items);
    }
    /**
     * Get full information about this Person
     *
     * @return {object}
     * */
    getInfo             () {
        let info:any = {
            name    : this.name,
            life    : this.life,
            defense : this.defense,
            attack  : this.attack,
            critical: this.critical,
            speed   : this.speed
        };
        if (this.gender) info.gender = this.gender;
        if (this._class) info._class = this._class;
        return info;
    }
    /**
     * Get name of current person
     *
     * @return {string}
     * */
    getName             () {return this.name}
    /**
     * Get gender of current person
     *
     * @return string
     * */
    getGender           () {return this.gender}
    /**
     * Get class of current person
     *
     * @return string
     * */
    getClass            () {return this._class}
    /**
     * Get image of current person
     *
     * @return string
     * */
    getImage            () {return this.image}
    /**
     * Get life of this Person
     *
     * @return number
     * */
    getLife             ():number {
        return this.life.current
    }
    /**
     * Get life percentage of current person
     *
     * @return number
     * */
    getLifePercentage   ():number {
        return this.life.max * this.life.current / 100;
    }
    /**
     * Get defense of current person
     *
     * @return number
     * */
    getDefense          () {return this.defense}
    /**
     * @return number
     * */
    getAttack           () {return this.attack}
    /**
     * @return number
     * */
    getExperience       () {return this.exp}
    /**
     * @return number
     * */
    getGold             () {return this.gold}
    /**
     * @return array
     * */
    getItems            () {return this.items}
    /**
     * @return number
     * */
    getCritical         () {return this.critical}
    /**
     * @return number
     * */
    getSpeed            () {return this.speed}
    /**
     * @return number
     * */
    getAmmunition       () {return this.ammunition}
    /**
     * @return number
     * */
    getLevel            () {return this.level}
    /**
     * @return void
     * */
    addLife             (value:number) {
        value = Math.abs(value);
        let max = value + this.life.current;
        if (max > this.life.max) {
            this.life.current = this.life.max;
        }
        else {
            this.life.current += value;
        }
    }
    /**
     * @return void
     * */
    addMaxLife          (value:number) {
        this.life.max += Math.max(0, Math.abs(value))
    }
    /**
     * @return void
     * */
    addDefense          (value:number) {this.defense += Math.max(0, Math.abs(value))}
    /**
     * @return void
     * */
    addAttack           (value:number) {this.attack += Math.max(0, Math.abs(value))}
    /**
     * @return void
     * */
    addCritical         (value:number) {this.critical += Math.max(0, Math.abs(value))}
    /**
     * @return void
     * */
    addSpeed            (value:number) { this.speed += Math.max(0, Math.abs(value))}
    /**
     * @return void
     * */
    addExperience       (value:number) { this.exp += Math.max(0, Math.abs(value))}
    /**
     * @return void
     * */
    addGold             (value:number) { this.gold += Math.max(0, Math.abs(value))}
    /**
     * @return void
     * */
    addAmmunition       (value:number) { this.ammunition += Math.max(0, Math.abs(value))}
    /**
     * @return void
     * */
    addLevel            (value:number) {
        this.setLevel(
            this.getLevel() + Math.abs(value)
        )
    }
    /**
     * @return void
     * */
    subLife             (value:number) {
        return this.life.current = Math.max(

            0, (this.life.current - Math.max(0, Math.abs(value)))
        );
    }
    /**
     * @return void
     * */
    subMaxLife             (value:number) {
        return this.life.max(Math.max(0, (this.life.max - Math.max(0, Math.abs(value)))));
    }
    /**
     * @return void
     * */
    subDefense          (value:number) {
        return this.setDefense(Math.max(0, (this.defense - Math.max(0, Math.abs(value)))));
    }
    /**
     * @return void
     * */
    subAttack           (value:number) {
        return this.setAttack(Math.max(0, (this.attack - Math.max(0, Math.abs(value)))));
    }
    /**
     * @return void
     * */
    subCritical         (value:number) {
        return this.setCritical(Math.max(0, (this.critical - Math.max(0, Math.abs(value)))));
    }
    /**
     * @return void
     * */
    subSpeed            (value:number) {
        return this.setSpeed(Math.max(0, (this.speed - Math.max(0, Math.abs(value)))));
    }
    /**
     * @return void
     * */
    subAmmunition       (value:number) {
        return this.setAmmunition(Math.max(0, (this.ammunition - Math.max(0, Math.abs(value)))));
    }
    /**
     * @return void
     * */
    subExperience       (value:number) {
        return this.setExperience(Math.max(0, (this.exp - Math.max(0, Math.abs(value)))));
    }
    /**
     * @return void
     * */
    subLevel       (value:number) {
        return this.setLevel(
            this.level - Math.max(0, Math.abs(value))
        );
    }
    /**
     * @return boolean
     * */
    isAlive             ():boolean {return this.getLife() > 0}
    /**
     * @return boolean
     * */
    isDead              ():boolean {return this.getLife() === 0}
    /**
     * @return boolean
     * */
    kill                ():boolean {this.setLife(0); return true}
    /**
     * @return void
     * */
    setLife             (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.life.current = Math.max(value, 0);
    }
    /**
     * @return void
     * */
    setMaxLife             (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.life.max = Math.max(value, 0);
    }
    /**
     * @return void
     * */
    setDefense          (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.defense = value
    }
    /**
     * @return void
     * */
    setAttack           (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.attack = value
    }
    /**
     * @return void
     * */
    setCritical         (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.critical = value
    }
    /**
     * @return void
     * */
    setSpeed            (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.speed= value
    }
    setExperience       (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.exp= value
    }
    /**
     * @return void
     * */
    setGold             (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.gold= value
    }
    /**
     * @return void
     * */
    setAmmunition       (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.ammunition= value
    }
    /**
     * @return void
     * */
    setLevel       (value:number) {
        if (!isNumber(value) || !value) value = 0;
        this.level= Math.max(1, value)
    }
    /**
     * @return void
     * */
    setImage            (value:string) {this.image = value}
    /**
     * @return void
     * */
    setName             (value:string) {this.name = value}
    /**
     * Set Person class.
     * Example: warrior.
     *
     * @return void
     * */
    setClass            (value:string) {this._class = value}
    /**
     * Set gender to this Person.
     * Example: Male
     *
     * @return void
     * */
    setGender           (value:string) {this.gender = value}
    /**
     * @return void
     * */
    setItems            (value:any) {this.items = value}
    /**
     * @param {number} attack - Final attack to receive it.
     * */
    receiveAttack       (attack:number) {
        let iam = this;
        let defense = this.getLife() * (this.getDefense().random() * 0.01);
        let finalDamage = Math.max(0, attack - defense);
        console.log( iam.getName() + ' has received an attack of ' + attack+ ' points but block with ' + defense + ' points. The final damage is '+finalDamage+' points.');
        this.subLife(finalDamage);
    }
    /**
     * @param {object} enemy - Enemy {Person} object
     * @return number
     * */
    attackTo            (enemy:any) {

        let iam = this;
        console.info( iam.getName() + ' is attacking ' + enemy.getName() );
        if (iam.isDead()) {
            console.error('You can not attack because you are dead.');
            return false;
        }
        else if (enemy.isDead()) {
            console.log('You can not attack to this opponent because he is dead.');
            return false;
        }

        this.addExperience(3);
        this.subAmmunition(1);
        let critical = this.getCritical().random() * 0.01;
        let attack = this.getAttack().random(20);
        let finalAttack = attack + (attack * critical);

        console.log( iam.getName() + ' has made an attack of ' + finalAttack + ' points to ' + enemy.getName() );

        enemy.receiveAttack(finalAttack);
        if (enemy.isDead()) {
            this.addExperience(1000);
            this.addGold(100 + enemy.getGold());
            enemy.setGold(0);
        }
        return enemy.getInfo().life;
    }
}