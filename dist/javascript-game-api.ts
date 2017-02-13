type T = Array<any> | any;

/**
 * Polyfill
 * */
if (!Array.isArray) {
	Array.isArray = (arg):boolean => {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys) {
	Object.keys = (function() {
		'use strict';
		let hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}
			let result = [],
				prop,
				i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}


/**
 * @constructor
 * */
class Utils {
	static getType (value:any):string {
		return typeof value;
	}
	static isFunction (value:any):boolean {
		return typeof value === 'function';
	}
	/**
	 * Check if a Object value
	 * @param {*} value
	 * @return boolean
	 * */
	static isObject (value):boolean {
		return null != value && toString.call(value) === '[object Object]';
	}
	/**
	 * Check if a Array value
	 * @param {*} value
	 * @return boolean
	 * */
	static isArray (value):boolean {
		if (Array.isArray) return Array.isArray(value);
		return value instanceof Array;
	}
	/**
	 * Check if a Empty value
	 * @param {*} value
	 * @return boolean
	 * */
	static isEmpty (value:any):boolean {
		if (Utils.isNull(value) || Utils.isUndefined(value)) return true;
		else if (Utils.isArray(value) || Utils.isString(value) ) return value.length === 0;
		else if (Utils.isObject(value)) return Object.keys(value).length === 0;
		else if (Utils.isNumber(value)) return value === 0;
		return false;
	}
	static isEmptyObject (value:any) {
		return Utils.isObject(value) && Object.keys(value).length === 0 || value === null;
	}
	/**
	 * Check if a String value
	 * @param {*} value
	 * @return boolean
	 * */
	static isString (value:any):boolean {
		return typeof value === 'string'
	}
	/**
	 * Check if a Integer value
	 * @param {*} value
	 * @return boolean
	 * */
	static isInteger (value:any):boolean {
		return typeof value === 'number' && Number(value) === value && value % 1 === 0;
	}
	/**
	 * Check if a Float value
	 * @param {*} value
	 * @return boolean
	 * */
	static isFloat (value:any):boolean {
		return typeof value === 'number' && Number(value) === value && value % 1 !== 0;
	}
	/**
	 * Check if a Integer or Float value
	 * @param {*} value
	 * @return boolean
	 * */
	static isNumber (value:any):boolean {
		return Utils.isInteger(value) || Utils.isFloat(value)
	}
	/**
	 *
	 * */
	static isTrue (value:any):boolean {
		return value === true || value === 1
	}
	/**
	 *
	 * */
	static isFalse (value:any):boolean {
		return value === false || value === 0
	}
	static isRegExp (value:any):boolean {
		return value instanceof RegExp;
	}
	static isDate (value:any):boolean {
		return value instanceof Date;
	}
	static isNull (value:any):boolean {
		return value === null;
	}
	static isUndefined (value:any):boolean {
		return typeof value === 'undefined'
	}
	static forEach(value:any, callback:Function) {
		if (Utils.isArray(value)) {
			for (let index = 0; index < value.length; index++) {
				let item = value[index];
				callback.call({}, item, index);
			}
		}
		else if (Utils.isObject(value)) {
			for (let property in value) {
				if (value.hasOwnProperty(property) ) {
					callback.call({}, value[property], property)
				}
			}
		}
	}
	static random (value:any, max?:number):any  {
		if (Utils.isArray(value)) {
			return value[Math.floor(Math.random()*value.length)];
		}
		else if (Utils.isNumber(value)) {
			if (!Utils.isNumber(max)) {
				max = value + Math.floor( Math.random() * value );
			}
			return Math.floor( Math.random() * max ) + value;
		}
	}

	static hasOwnProperty (properties:any, object:Object):boolean {
		if (!this.isObject(object)) throw new Error('Utils:hasOwnProperty: only accept object');
		if (this.isArray(properties)) {
			for (let property of properties) {
				if (!object.hasOwnProperty(property)) return false;
			}
			return true;
		}
		else if (Utils.isString(properties)) {
			return object.hasOwnProperty(properties);
		}
	}
}
/**
 * @constructor
 * */
class Messages {

}
/**
 * Class to create Items
 * @constructor
 * */
class Item {
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

    constructor (options) {
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
/**
 * Class to manage items on invantary
 * @constructor
 * */
class Inventory{
	/**
	 * Max weight of this inventory
	 * @property
	 * */
	private maxWeight   :number;
	/**
	 * Max size/space for all items
	 * @property
	 * */
	private maxSize:number;
	private items       :any;
    private gold        :number;
    private size        :number;
    constructor     ()  {
    	this.gold = 0;
    	this.items = [];
    }
    /**
     *
     * */
    getGold ():number {
    	return this.gold;
    }
    setGold(value:number):boolean {
    	this.gold = Math.max(0, Math.abs(value));
	    if (this.gold < 0) this.gold = 0;
	    return true;
    }
    addGold(value:number):boolean {
	    this.gold += Math.max(0, Math.abs(value));
	    if (this.gold < 0) this.gold = 0;
	    return true;
    }
    subGold(value:number):boolean {
	    this.gold -= Math.max(0, Math.abs(value));
	    if (this.gold < 0) this.gold = 0;
	    return true;
    }
    /**
     * Apply over PersonObject
     * @param {*} player
     * */
    apply           (player:Person|any):boolean {
    	if (Person.isValid(player)) {
    		console.log('this.items:', this.items);
    		Utils.forEach(this.items, function (item, index) {
    			if (Utils.isNumber(item.life)) {
    				player.addLife(item.life);
			    }
    			if (Utils.isNumber(item.defense)) {
    				player.addDefense(item.defense);
			    }
    			if (Utils.isNumber(item.attack)) {
    				player.addAttack(item.attack);
			    }
    			if (Utils.isNumber(item.critical)) {
    				player.addCritical(item.critical);
			    }
		    });
    		return true;
	    }
	    return false;
    }
    /**
     * @param {*} item
     * */
	isItem          (item:any|Object):boolean {
    	if (Utils.isNull(item) || Utils.isUndefined(item)) {
    		console.error('No es un objeto');
		    return false;
	    }
    	if (!Utils.isObject(item) || Utils.isEmptyObject(item)){
    		console.error('Objecto vacio');
		    return false;
	    }
    	if (!Utils.hasOwnProperty(['name', 'weight', 'size', 'price'], item)){
    		console.error('No tiene las propiedades');
		    return false;
	    }
    	return true;
    }
	isSeteable      (item:Item|any):boolean {
    	if (!this.isItem(item)) {
    		console.error('No es un item valido');
    		return false;
	    }
    	let carry = this.getWeightCarry() + item.weight;
    	if (carry > this.getMaxWeight()) {
    		console.error('El peso es superir al maximo');
    		return false;
	    }
    	let size = this.getSizeCarry() + item.size;
    	if (size > this.getMaxSize()) {
    		console.error('El tamaño es superior al permitido');
    		return false;
	    }
	    return true;
    }

    all ():Array<T> {
		return this.items;
    }
    /**
     * Get current weight carry on this inventory
     * */
    getWeightCarry  ():number {
    	return 0;
    }
	getMaxSize      () {
    	return this.maxSize;
    }
	getSizeCarry    () {
    	return 0;
	}
	getMaxWeight    ():number {
    	return this.maxWeight;
	}
    getItem         () {}
    getItems        () {}
    /**
     *
     * */
    setItem         (item:any) {
    	if (!this.isSeteable(item)) return false;
    	console.info('el item se añadio');
    	this.items.push(item);
    	return true;
    }
    /**
     *
     * */
    setItemArray         (items:Array<T>) {
    	for (let item in items) {
    		if (!this.setItem(item)) {
    			return false;
		    }
	    }
    	return true;
    }
}
/**
 * Class to manage players
 * @constructor
 * */
class Person {
	private statistics:Object;
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
    private inventory:Inventory;
    constructor         (info: any) {
    	this.statistics = {
    		buys:0,
		    kills:0
	    };
        this.life = {
            current :   0,
            max     :   0
        };
	    // set person inventory
	    this.inventory = new Inventory();

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
        this.inventory.setGold(info.gold || 0);
        this.setSpeed(info.speed || 0);
        this.setLevel(Math.max(1, info.level) || 1); // min level is 1
        if (info.hasOwnProperty('image'))    this.setImage(info.image);
        if (info.hasOwnProperty('items'))    this.setItem(info.items);

    }
    /**
     *
     * */
    static isValid (person:any):boolean {
    	return Utils.isObject(person) && Utils.hasOwnProperty([
    		'name', 'level', 'life', 'defense', 'attack', 'inventory'
	    ], person);
    }
    /**
     * Get full information about this Person
     *
     * @return {object}
     * */
    getInfo             () {
        let info:any = {
	        statistics: this.statistics,
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
    getName             ():string {return this.name}
    /**
     * Get gender of current person
     *
     * @return string
     * */
    getGender           ():string {return this.gender}
    /**
     * Get class of current person
     *
     * @return string
     * */
    getClass            ():string {return this._class}
    /**
     * Get image of current person
     *
     * @return string
     * */
    getImage            ():any {return this.image}
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
    	return this.life.current * 100 / this.life.max;
    }
    /**
     * Get defense of current person
     *
     * @return number
     * */
    getDefense          ():number {return this.defense}
    /**
     * @return number
     * */
    getAttack           ():number {return this.attack}
    /**
     * @return number
     * */
    getExperience       ():number {return this.exp}
    /**
     * @return number
     * */
    getGold             ():number {
    	return this.inventory.getGold()
    }
    /**
     * @return array
     * */
    getItems            ():any {return this.items}
    /**
     * @return number
     * */
    getCritical         ():number {return this.critical}
    /**
     * @return number
     * */
    getSpeed            ():number {return this.speed}
    /**
     * @return number
     * */
    getAmmunition       ():number {return this.ammunition}
    /**
     * @return number
     * */
    getLevel            ():number {return this.level}
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
        if (!Utils.isNumber(value) || !value) value = 0;
        this.life.current = Math.max(value, 0);
    }
    /**
     * @return void
     * */
    setMaxLife             (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.life.max = Math.max(value, 0);
    }
    /**
     * @return void
     * */
    setDefense          (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.defense = value
    }
    /**
     * @return void
     * */
    setAttack           (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.attack = value
    }
    /**
     * @return void
     * */
    setCritical         (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.critical = value
    }
    /**
     * @return void
     * */
    setSpeed            (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.speed= value
    }
    setExperience       (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.exp= value
    }
    /**
     * @return void
     * */
    setGold             (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.gold= value
    }
    /**
     * @return void
     * */
    setAmmunition       (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
        this.ammunition= value
    }
    /**
     * @return void
     * */
    setLevel       (value:number) {
        if (!Utils.isNumber(value) || !value) value = 0;
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
    setItem             (item:any) {
    	this.inventory.setItem(item);
    	this.inventory.apply(this);
    }
    /**
     * @param {object} enemy - Enemy {Person} object
     * @param {object} actions
     * @return number
     * */
    attackTo            (enemy:any, actions:any):any {
    	let fn:any = {
    		onKill  :() => {},
    		onHit   :() => {},
    		onBlock :() => {},
		    onMiss  :() => {},
    		onError :() => {}
	    };
    	if (!Utils.isObject(actions)) actions = {};
    	if (!Utils.isEmptyObject(actions)) {
    		//if (Utils.isNumber(actions.combo))
    		if (Utils.isFunction(actions.onKill)) fn.onKill = actions.onKill;
    		if (Utils.isFunction(actions.onHit)) fn.onHit = actions.onHit;
    		if (Utils.isFunction(actions.onMiss)) fn.onMiss = actions.onMiss;
    		if (Utils.isFunction(actions.onBlock)) fn.onBlock = actions.onBlock;
    		if (Utils.isFunction(actions.onError)) fn.onError = actions.onError;
	    }



        let iam = this;

        if (iam.isDead()) {
	        fn.onError.call(iam, 'You can not attack because you are dead.');
            return false;
        }
        else if (enemy.isDead()) {
	        fn.onError.call(enemy, 'You can not attack because the enemy is dead');
            return false;
        }
        else {
	        let critical = Utils.random(this.getCritical()) * 0.01;
	        let attack = Utils.random(this.getAttack(), 20);
	        let finalAttack = attack + (attack * critical);

	        if (finalAttack > 0) {
		        fn.onHit.call(enemy, finalAttack);
	        } else {
		        fn.onMiss.call(enemy, finalAttack);
	        }


	        let defense = enemy.getLife() * (Utils.random(enemy.getDefense()) * 0.01);
	        let finalDamage = Math.max(0, attack - defense);

	        if (defense > 0) {
		        fn.onBlock.call(enemy, defense, finalDamage)
	        }

	        enemy.subLife(finalDamage);


	        if (enemy.isDead()) {
		        fn.onKill.call(enemy);
	        }
	        //
	        return {
		        then : (callback: Function):any => {
			        if (Utils.isFunction(callback)) {
				        callback.call(this);
			        }
		        }
	        }

        }
    }
}
