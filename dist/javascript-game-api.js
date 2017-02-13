/**
 * Polyfill
 * */
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'), dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ], dontEnumsLength = dontEnums.length;
        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }
            var result = [], prop, i;
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
var Utils = (function () {
    function Utils() {
    }
    Utils.getType = function (value) {
        return typeof value;
    };
    Utils.isFunction = function (value) {
        return typeof value === 'function';
    };
    /**
     * Check if a Object value
     * @param {*} value
     * @return boolean
     * */
    Utils.isObject = function (value) {
        return null != value && toString.call(value) === '[object Object]';
    };
    /**
     * Check if a Array value
     * @param {*} value
     * @return boolean
     * */
    Utils.isArray = function (value) {
        if (Array.isArray)
            return Array.isArray(value);
        return value instanceof Array;
    };
    /**
     * Check if a Empty value
     * @param {*} value
     * @return boolean
     * */
    Utils.isEmpty = function (value) {
        if (Utils.isNull(value) || Utils.isUndefined(value))
            return true;
        else if (Utils.isArray(value) || Utils.isString(value))
            return value.length === 0;
        else if (Utils.isObject(value))
            return Object.keys(value).length === 0;
        else if (Utils.isNumber(value))
            return value === 0;
        return false;
    };
    Utils.isEmptyObject = function (value) {
        return Utils.isObject(value) && Object.keys(value).length === 0 || value === null;
    };
    /**
     * Check if a String value
     * @param {*} value
     * @return boolean
     * */
    Utils.isString = function (value) {
        return typeof value === 'string';
    };
    /**
     * Check if a Integer value
     * @param {*} value
     * @return boolean
     * */
    Utils.isInteger = function (value) {
        return typeof value === 'number' && Number(value) === value && value % 1 === 0;
    };
    /**
     * Check if a Float value
     * @param {*} value
     * @return boolean
     * */
    Utils.isFloat = function (value) {
        return typeof value === 'number' && Number(value) === value && value % 1 !== 0;
    };
    /**
     * Check if a Integer or Float value
     * @param {*} value
     * @return boolean
     * */
    Utils.isNumber = function (value) {
        return Utils.isInteger(value) || Utils.isFloat(value);
    };
    /**
     *
     * */
    Utils.isTrue = function (value) {
        return value === true || value === 1;
    };
    /**
     *
     * */
    Utils.isFalse = function (value) {
        return value === false || value === 0;
    };
    Utils.isRegExp = function (value) {
        return value instanceof RegExp;
    };
    Utils.isDate = function (value) {
        return value instanceof Date;
    };
    Utils.isNull = function (value) {
        return value === null;
    };
    Utils.isUndefined = function (value) {
        return typeof value === 'undefined';
    };
    Utils.forEach = function (value, callback) {
        if (Utils.isArray(value)) {
            for (var index = 0; index < value.length; index++) {
                var item = value[index];
                callback.call({}, item, index);
            }
        }
        else if (Utils.isObject(value)) {
            for (var property in value) {
                if (value.hasOwnProperty(property)) {
                    callback.call({}, value[property], property);
                }
            }
        }
    };
    Utils.random = function (value, max) {
        if (Utils.isArray(value)) {
            return value[Math.floor(Math.random() * value.length)];
        }
        else if (Utils.isNumber(value)) {
            if (!Utils.isNumber(max)) {
                max = value + Math.floor(Math.random() * value);
            }
            return Math.floor(Math.random() * max) + value;
        }
    };
    Utils.hasOwnProperty = function (properties, object) {
        if (!this.isObject(object))
            throw new Error('Utils:hasOwnProperty: only accept object');
        if (this.isArray(properties)) {
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var property = properties_1[_i];
                if (!object.hasOwnProperty(property))
                    return false;
            }
            return true;
        }
        else if (Utils.isString(properties)) {
            return object.hasOwnProperty(properties);
        }
    };
    return Utils;
}());
/**
 * @constructor
 * */
var Messages = (function () {
    function Messages() {
    }
    return Messages;
}());
/**
 * Class to create Items
 * @constructor
 * */
var Item = (function () {
    function Item(options) {
        this.name = options.name;
        this.value = options.value;
        this.attack = options.attack;
        this.defense = options.defense;
    }
    /**
     * Get item weight
     * @return number
     * */
    Item.prototype.getWeight = function () {
        return this.weight;
    };
    Item.prototype.getSize = function () {
        return this.size;
    };
    return Item;
}());
/**
 * Class to manage items on invantary
 * @constructor
 * */
var Inventory = (function () {
    function Inventory() {
        this.gold = 0;
        this.items = [];
    }
    /**
     *
     * */
    Inventory.prototype.getGold = function () {
        return this.gold;
    };
    Inventory.prototype.setGold = function (value) {
        this.gold = Math.max(0, Math.abs(value));
        if (this.gold < 0)
            this.gold = 0;
        return true;
    };
    Inventory.prototype.addGold = function (value) {
        this.gold += Math.max(0, Math.abs(value));
        if (this.gold < 0)
            this.gold = 0;
        return true;
    };
    Inventory.prototype.subGold = function (value) {
        this.gold -= Math.max(0, Math.abs(value));
        if (this.gold < 0)
            this.gold = 0;
        return true;
    };
    /**
     * Apply over PersonObject
     * @param {*} player
     * */
    Inventory.prototype.apply = function (player) {
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
    };
    /**
     * @param {*} item
     * */
    Inventory.prototype.isItem = function (item) {
        if (Utils.isNull(item) || Utils.isUndefined(item)) {
            console.error('No es un objeto');
            return false;
        }
        if (!Utils.isObject(item) || Utils.isEmptyObject(item)) {
            console.error('Objecto vacio');
            return false;
        }
        if (!Utils.hasOwnProperty(['name', 'weight', 'size', 'price'], item)) {
            console.error('No tiene las propiedades');
            return false;
        }
        return true;
    };
    Inventory.prototype.isSeteable = function (item) {
        if (!this.isItem(item)) {
            console.error('No es un item valido');
            return false;
        }
        var carry = this.getWeightCarry() + item.weight;
        if (carry > this.getMaxWeight()) {
            console.error('El peso es superir al maximo');
            return false;
        }
        var size = this.getSizeCarry() + item.size;
        if (size > this.getMaxSize()) {
            console.error('El tamaño es superior al permitido');
            return false;
        }
        return true;
    };
    Inventory.prototype.all = function () {
        return this.items;
    };
    /**
     * Get current weight carry on this inventory
     * */
    Inventory.prototype.getWeightCarry = function () {
        return 0;
    };
    Inventory.prototype.getMaxSize = function () {
        return this.maxSize;
    };
    Inventory.prototype.getSizeCarry = function () {
        return 0;
    };
    Inventory.prototype.getMaxWeight = function () {
        return this.maxWeight;
    };
    Inventory.prototype.getItem = function () { };
    Inventory.prototype.getItems = function () { };
    /**
     *
     * */
    Inventory.prototype.setItem = function (item) {
        if (!this.isSeteable(item))
            return false;
        console.info('el item se añadio');
        this.items.push(item);
        return true;
    };
    /**
     *
     * */
    Inventory.prototype.setItemArray = function (items) {
        for (var item in items) {
            if (!this.setItem(item)) {
                return false;
            }
        }
        return true;
    };
    return Inventory;
}());
/**
 * Class to manage players
 * @constructor
 * */
var Person = (function () {
    function Person(info) {
        this.statistics = {
            buys: 0,
            kills: 0
        };
        this.life = {
            current: 0,
            max: 0
        };
        // set person inventory
        this.inventory = new Inventory();
        if (info.hasOwnProperty('name'))
            this.setName(info.name);
        if (info.hasOwnProperty('gender'))
            this.setGender(info.gender);
        if (info.hasOwnProperty('_class'))
            this.setClass(info._class);
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
        if (info.hasOwnProperty('image'))
            this.setImage(info.image);
        if (info.hasOwnProperty('items'))
            this.setItem(info.items);
    }
    /**
     *
     * */
    Person.isValid = function (person) {
        return Utils.isObject(person) && Utils.hasOwnProperty([
            'name', 'level', 'life', 'defense', 'attack', 'inventory'
        ], person);
    };
    /**
     * Get full information about this Person
     *
     * @return {object}
     * */
    Person.prototype.getInfo = function () {
        var info = {
            statistics: this.statistics,
            name: this.name,
            life: this.life,
            defense: this.defense,
            attack: this.attack,
            critical: this.critical,
            speed: this.speed
        };
        if (this.gender)
            info.gender = this.gender;
        if (this._class)
            info._class = this._class;
        return info;
    };
    /**
     * Get name of current person
     *
     * @return {string}
     * */
    Person.prototype.getName = function () { return this.name; };
    /**
     * Get gender of current person
     *
     * @return string
     * */
    Person.prototype.getGender = function () { return this.gender; };
    /**
     * Get class of current person
     *
     * @return string
     * */
    Person.prototype.getClass = function () { return this._class; };
    /**
     * Get image of current person
     *
     * @return string
     * */
    Person.prototype.getImage = function () { return this.image; };
    /**
     * Get life of this Person
     *
     * @return number
     * */
    Person.prototype.getLife = function () {
        return this.life.current;
    };
    /**
     * Get life percentage of current person
     *
     * @return number
     * */
    Person.prototype.getLifePercentage = function () {
        return this.life.current * 100 / this.life.max;
    };
    /**
     * Get defense of current person
     *
     * @return number
     * */
    Person.prototype.getDefense = function () { return this.defense; };
    /**
     * @return number
     * */
    Person.prototype.getAttack = function () { return this.attack; };
    /**
     * @return number
     * */
    Person.prototype.getExperience = function () { return this.exp; };
    /**
     * @return number
     * */
    Person.prototype.getGold = function () {
        return this.inventory.getGold();
    };
    /**
     * @return array
     * */
    Person.prototype.getItems = function () { return this.items; };
    /**
     * @return number
     * */
    Person.prototype.getCritical = function () { return this.critical; };
    /**
     * @return number
     * */
    Person.prototype.getSpeed = function () { return this.speed; };
    /**
     * @return number
     * */
    Person.prototype.getAmmunition = function () { return this.ammunition; };
    /**
     * @return number
     * */
    Person.prototype.getLevel = function () { return this.level; };
    /**
     * @return void
     * */
    Person.prototype.addLife = function (value) {
        value = Math.abs(value);
        var max = value + this.life.current;
        if (max > this.life.max) {
            this.life.current = this.life.max;
        }
        else {
            this.life.current += value;
        }
    };
    /**
     * @return void
     * */
    Person.prototype.addMaxLife = function (value) {
        this.life.max += Math.max(0, Math.abs(value));
    };
    /**
     * @return void
     * */
    Person.prototype.addDefense = function (value) { this.defense += Math.max(0, Math.abs(value)); };
    /**
     * @return void
     * */
    Person.prototype.addAttack = function (value) { this.attack += Math.max(0, Math.abs(value)); };
    /**
     * @return void
     * */
    Person.prototype.addCritical = function (value) { this.critical += Math.max(0, Math.abs(value)); };
    /**
     * @return void
     * */
    Person.prototype.addSpeed = function (value) { this.speed += Math.max(0, Math.abs(value)); };
    /**
     * @return void
     * */
    Person.prototype.addExperience = function (value) { this.exp += Math.max(0, Math.abs(value)); };
    /**
     * @return void
     * */
    Person.prototype.addGold = function (value) { this.gold += Math.max(0, Math.abs(value)); };
    /**
     * @return void
     * */
    Person.prototype.addAmmunition = function (value) { this.ammunition += Math.max(0, Math.abs(value)); };
    /**
     * @return void
     * */
    Person.prototype.addLevel = function (value) {
        this.setLevel(this.getLevel() + Math.abs(value));
    };
    /**
     * @return void
     * */
    Person.prototype.subLife = function (value) {
        return this.life.current = Math.max(0, (this.life.current - Math.max(0, Math.abs(value))));
    };
    /**
     * @return void
     * */
    Person.prototype.subMaxLife = function (value) {
        return this.life.max(Math.max(0, (this.life.max - Math.max(0, Math.abs(value)))));
    };
    /**
     * @return void
     * */
    Person.prototype.subDefense = function (value) {
        return this.setDefense(Math.max(0, (this.defense - Math.max(0, Math.abs(value)))));
    };
    /**
     * @return void
     * */
    Person.prototype.subAttack = function (value) {
        return this.setAttack(Math.max(0, (this.attack - Math.max(0, Math.abs(value)))));
    };
    /**
     * @return void
     * */
    Person.prototype.subCritical = function (value) {
        return this.setCritical(Math.max(0, (this.critical - Math.max(0, Math.abs(value)))));
    };
    /**
     * @return void
     * */
    Person.prototype.subSpeed = function (value) {
        return this.setSpeed(Math.max(0, (this.speed - Math.max(0, Math.abs(value)))));
    };
    /**
     * @return void
     * */
    Person.prototype.subAmmunition = function (value) {
        return this.setAmmunition(Math.max(0, (this.ammunition - Math.max(0, Math.abs(value)))));
    };
    /**
     * @return void
     * */
    Person.prototype.subExperience = function (value) {
        return this.setExperience(Math.max(0, (this.exp - Math.max(0, Math.abs(value)))));
    };
    /**
     * @return void
     * */
    Person.prototype.subLevel = function (value) {
        return this.setLevel(this.level - Math.max(0, Math.abs(value)));
    };
    /**
     * @return boolean
     * */
    Person.prototype.isAlive = function () { return this.getLife() > 0; };
    /**
     * @return boolean
     * */
    Person.prototype.isDead = function () { return this.getLife() === 0; };
    /**
     * @return boolean
     * */
    Person.prototype.kill = function () { this.setLife(0); return true; };
    /**
     * @return void
     * */
    Person.prototype.setLife = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.life.current = Math.max(value, 0);
    };
    /**
     * @return void
     * */
    Person.prototype.setMaxLife = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.life.max = Math.max(value, 0);
    };
    /**
     * @return void
     * */
    Person.prototype.setDefense = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.defense = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setAttack = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.attack = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setCritical = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.critical = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setSpeed = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.speed = value;
    };
    Person.prototype.setExperience = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.exp = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setGold = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.gold = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setAmmunition = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.ammunition = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setLevel = function (value) {
        if (!Utils.isNumber(value) || !value)
            value = 0;
        this.level = Math.max(1, value);
    };
    /**
     * @return void
     * */
    Person.prototype.setImage = function (value) { this.image = value; };
    /**
     * @return void
     * */
    Person.prototype.setName = function (value) { this.name = value; };
    /**
     * Set Person class.
     * Example: warrior.
     *
     * @return void
     * */
    Person.prototype.setClass = function (value) { this._class = value; };
    /**
     * Set gender to this Person.
     * Example: Male
     *
     * @return void
     * */
    Person.prototype.setGender = function (value) { this.gender = value; };
    /**
     * @return void
     * */
    Person.prototype.setItem = function (item) {
        this.inventory.setItem(item);
        this.inventory.apply(this);
    };
    /**
     * @param {object} enemy - Enemy {Person} object
     * @param {object} actions
     * @return number
     * */
    Person.prototype.attackTo = function (enemy, actions) {
        var _this = this;
        var fn = {
            onKill: function () { },
            onHit: function () { },
            onBlock: function () { },
            onMiss: function () { },
            onError: function () { }
        };
        if (!Utils.isObject(actions))
            actions = {};
        if (!Utils.isEmptyObject(actions)) {
            //if (Utils.isNumber(actions.combo))
            if (Utils.isFunction(actions.onKill))
                fn.onKill = actions.onKill;
            if (Utils.isFunction(actions.onHit))
                fn.onHit = actions.onHit;
            if (Utils.isFunction(actions.onMiss))
                fn.onMiss = actions.onMiss;
            if (Utils.isFunction(actions.onBlock))
                fn.onBlock = actions.onBlock;
            if (Utils.isFunction(actions.onError))
                fn.onError = actions.onError;
        }
        var iam = this;
        if (iam.isDead()) {
            fn.onError.call(iam, 'You can not attack because you are dead.');
            return false;
        }
        else if (enemy.isDead()) {
            fn.onError.call(enemy, 'You can not attack because the enemy is dead');
            return false;
        }
        else {
            var critical = Utils.random(this.getCritical()) * 0.01;
            var attack = Utils.random(this.getAttack(), 20);
            var finalAttack = attack + (attack * critical);
            var defense = enemy.getLife() * (Utils.random(enemy.getDefense()) * 0.01);
            var finalDamage = Math.max(0, attack - defense);
            enemy.subLife(finalDamage);
            if (enemy.isDead()) {
                fn.onKill.call(enemy);
            }
            else if (defense > finalAttack) {
                fn.onBlock.call(enemy, defense, finalDamage);
            }
            else if (finalAttack > 0) {
                fn.onHit.call(enemy, finalAttack);
            }
            else {
                fn.onMiss.call(enemy, finalAttack);
            }
            //
            return {
                then: function (callback) {
                    if (Utils.isFunction(callback)) {
                        callback.call(_this);
                    }
                }
            };
        }
    };
    return Person;
}());
