/**
 * Get random item from array
 *
 * @return {*}
 * */
Array.prototype.random = function () {
    var values = this;
    return values[Math.floor(Math.random() * values.length)];
};
/**
 * Check if a number(float or integer) value
 * @param {*} value
 * @return boolean
 * */
function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
/**
 *
 * @param {int} min
 * @return number
 * */
Number.prototype.random = function (min) {
    var max = this;
    if (!isNumber(max))
        max = 1;
    if (!isNumber(min))
        min = 0;
    return Math.floor(Math.random() * max) + min;
};
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
    return Item;
}());
/**
 * Class to manage items on invantary
 * @constructor
 * */
var Inventory = (function () {
    function Inventory() {
    }
    Inventory.prototype.getItems = function () { };
    Inventory.prototype.removeItem = function () { };
    Inventory.prototype.sellItem = function () { };
    Inventory.prototype.buyItem = function () { };
    return Inventory;
}());
/**
 * Class to manage players
 * @constructor
 * */
var Person = (function () {
    function Person(info) {
        this.life = {
            current: 0,
            max: 0
        };
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
        this.setGold(info.gold || 0);
        this.setSpeed(info.speed || 0);
        this.setLevel(Math.max(1, info.level) || 1); // min level is 1
        if (info.hasOwnProperty('image'))
            this.setImage(info.image);
        if (info.hasOwnProperty('items'))
            this.setItems(info.items);
    }
    /**
     * Get full information about this Person
     *
     * @return {object}
     * */
    Person.prototype.getInfo = function () {
        var info = {
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
        return this.life.max * this.life.current / 100;
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
    Person.prototype.getGold = function () { return this.gold; };
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
        if (!isNumber(value) || !value)
            value = 0;
        this.life.current = Math.max(value, 0);
    };
    /**
     * @return void
     * */
    Person.prototype.setMaxLife = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.life.max = Math.max(value, 0);
    };
    /**
     * @return void
     * */
    Person.prototype.setDefense = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.defense = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setAttack = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.attack = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setCritical = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.critical = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setSpeed = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.speed = value;
    };
    Person.prototype.setExperience = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.exp = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setGold = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.gold = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setAmmunition = function (value) {
        if (!isNumber(value) || !value)
            value = 0;
        this.ammunition = value;
    };
    /**
     * @return void
     * */
    Person.prototype.setLevel = function (value) {
        if (!isNumber(value) || !value)
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
    Person.prototype.setItems = function (value) { this.items = value; };
    /**
     * @param {number} attack - Final attack to receive it.
     * */
    Person.prototype.receiveAttack = function (attack) {
        var iam = this;
        var defense = this.getLife() * (this.getDefense().random() * 0.01);
        var finalDamage = Math.max(0, attack - defense);
        console.log(iam.getName() + ' has received an attack of ' + attack + ' points but block with ' + defense + ' points. The final damage is ' + finalDamage + ' points.');
        this.subLife(finalDamage);
    };
    /**
     * @param {object} enemy - Enemy {Person} object
     * @return number
     * */
    Person.prototype.attackTo = function (enemy) {
        var iam = this;
        console.info(iam.getName() + ' is attacking ' + enemy.getName());
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
        var critical = this.getCritical().random() * 0.01;
        var attack = this.getAttack().random(20);
        var finalAttack = attack + (attack * critical);
        console.log(iam.getName() + ' has made an attack of ' + finalAttack + ' points to ' + enemy.getName());
        enemy.receiveAttack(finalAttack);
        if (enemy.isDead()) {
            this.addExperience(1000);
            this.addGold(100 + enemy.getGold());
            enemy.setGold(0);
        }
        return enemy.getInfo().life;
    };
    return Person;
}());
