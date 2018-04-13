///<reference path='../Helpers/Utils.ts'/>
///<reference path='../Inventory/Inventory.ts'/>
///<reference path='Wound.ts'/>
///<reference path='Karma.ts'/>
///<reference path='../Diseases/Diseases.ts'/>
var Game;
(function (Game) {
    var Character;
    (function (Character_1) {
        var Character = /** @class */ (function () {
            function Character(info) {
                //this.karma = new Karma();
                this.statistics = {
                    buys: 0,
                    kills: 0
                };
                this.life = {
                    current: 0,
                    max: 0
                };
                // set person inventory
                this.inventory = new Game.Inventory.Inventory();
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
            Character.isValid = function (person) {
                return Game.Helpers.Utils.isObject(person) && Game.Helpers.Utils.hasOwnProperty([
                    'name', 'level', 'life', 'defense', 'attack', 'inventory'
                ], person);
            };
            /**
             * Get full information about this Person
             *
             * @return {object}
             * */
            Character.prototype.getInfo = function () {
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
            Character.prototype.getName = function () { return this.name; };
            /**
             * Get gender of current person
             *
             * @return string
             * */
            Character.prototype.getGender = function () { return this.gender; };
            /**
             * Get class of current person
             *
             * @return string
             * */
            Character.prototype.getClass = function () { return this._class; };
            /**
             * Get image of current person
             *
             * @return string
             * */
            Character.prototype.getImage = function () { return this.image; };
            /**
             * Get life of this Person
             *
             * @return number
             * */
            Character.prototype.getLife = function () {
                return this.life.current;
            };
            /**
             * Get life percentage of current person
             *
             * @return number
             * */
            Character.prototype.getLifePercentage = function () {
                return this.life.current * 100 / this.life.max;
            };
            /**
             * Get defense of current person
             *
             * @return number
             * */
            Character.prototype.getDefense = function () { return this.defense; };
            /**
             * @return number
             * */
            Character.prototype.getAttack = function () { return this.attack; };
            /**
             * @return number
             * */
            Character.prototype.getExperience = function () { return this.exp; };
            /**
             * @return number
             * */
            Character.prototype.getGold = function () {
                return this.inventory.getGold();
            };
            /**
             * @return array
             * */
            Character.prototype.getItems = function () { return this.items; };
            /**
             * @return number
             * */
            Character.prototype.getCritical = function () { return this.critical; };
            /**
             * @return number
             * */
            Character.prototype.getSpeed = function () { return this.speed; };
            /**
             * @return number
             * */
            Character.prototype.getAmmunition = function () { return this.ammunition; };
            /**
             * @return number
             * */
            Character.prototype.getLevel = function () { return this.level; };
            /**
             * @return void
             * */
            Character.prototype.addLife = function (value) {
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
            Character.prototype.addMaxLife = function (value) {
                this.life.max += Math.max(0, Math.abs(value));
            };
            /**
             * @return void
             * */
            Character.prototype.addDefense = function (value) { this.defense += Math.max(0, Math.abs(value)); };
            /**
             * @return void
             * */
            Character.prototype.addAttack = function (value) { this.attack += Math.max(0, Math.abs(value)); };
            /**
             * @return void
             * */
            Character.prototype.addCritical = function (value) { this.critical += Math.max(0, Math.abs(value)); };
            /**
             * @return void
             * */
            Character.prototype.addSpeed = function (value) { this.speed += Math.max(0, Math.abs(value)); };
            /**
             * @return void
             * */
            Character.prototype.addExperience = function (value) { this.exp += Math.max(0, Math.abs(value)); };
            /**
             * @return void
             * */
            Character.prototype.addGold = function (value) { this.gold += Math.max(0, Math.abs(value)); };
            /**
             * @return void
             * */
            Character.prototype.addAmmunition = function (value) { this.ammunition += Math.max(0, Math.abs(value)); };
            /**
             * @return void
             * */
            Character.prototype.addLevel = function (value) {
                this.setLevel(this.getLevel() + Math.abs(value));
            };
            /**
             * @return void
             * */
            Character.prototype.subLife = function (value) {
                return this.life.current = Math.max(0, (this.life.current - Math.max(0, Math.abs(value))));
            };
            /**
             * @return void
             * */
            Character.prototype.subMaxLife = function (value) {
                return this.life.max(Math.max(0, (this.life.max - Math.max(0, Math.abs(value)))));
            };
            /**
             * @return void
             * */
            Character.prototype.subDefense = function (value) {
                return this.setDefense(Math.max(0, (this.defense - Math.max(0, Math.abs(value)))));
            };
            /**
             * @return void
             * */
            Character.prototype.subAttack = function (value) {
                return this.setAttack(Math.max(0, (this.attack - Math.max(0, Math.abs(value)))));
            };
            /**
             * @return void
             * */
            Character.prototype.subCritical = function (value) {
                return this.setCritical(Math.max(0, (this.critical - Math.max(0, Math.abs(value)))));
            };
            /**
             * @return void
             * */
            Character.prototype.subSpeed = function (value) {
                return this.setSpeed(Math.max(0, (this.speed - Math.max(0, Math.abs(value)))));
            };
            /**
             * @return void
             * */
            Character.prototype.subAmmunition = function (value) {
                return this.setAmmunition(Math.max(0, (this.ammunition - Math.max(0, Math.abs(value)))));
            };
            /**
             * @return void
             * */
            Character.prototype.subExperience = function (value) {
                return this.setExperience(Math.max(0, (this.exp - Math.max(0, Math.abs(value)))));
            };
            /**
             * @return void
             * */
            Character.prototype.subLevel = function (value) {
                return this.setLevel(this.level - Math.max(0, Math.abs(value)));
            };
            /**
             * @return boolean
             * */
            Character.prototype.isAlive = function () { return this.getLife() > 0; };
            /**
             * @return boolean
             * */
            Character.prototype.isDead = function () { return this.getLife() === 0; };
            /**
             * @return boolean
             * */
            Character.prototype.kill = function () { this.setLife(0); return true; };
            /**
             * @return void
             * */
            Character.prototype.setLife = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.life.current = Math.max(value, 0);
            };
            /**
             * @return void
             * */
            Character.prototype.setMaxLife = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.life.max = Math.max(value, 0);
            };
            /**
             * @return void
             * */
            Character.prototype.setDefense = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.defense = value;
            };
            /**
             * @return void
             * */
            Character.prototype.setAttack = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.attack = value;
            };
            /**
             * @return void
             * */
            Character.prototype.setCritical = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.critical = value;
            };
            /**
             * @return void
             * */
            Character.prototype.setSpeed = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.speed = value;
            };
            Character.prototype.setExperience = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.exp = value;
            };
            /**
             * @return void
             * */
            Character.prototype.setGold = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.gold = value;
            };
            /**
             * @return void
             * */
            Character.prototype.setAmmunition = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.ammunition = value;
            };
            /**
             * @return void
             * */
            Character.prototype.setLevel = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.level = Math.max(1, value);
            };
            /**
             * @return void
             * */
            Character.prototype.setImage = function (value) { this.image = value; };
            /**
             * @return void
             * */
            Character.prototype.setName = function (value) { this.name = value; };
            /**
             * Set Person class.
             * Example: warrior.
             *
             * @return void
             * */
            Character.prototype.setClass = function (value) { this._class = value; };
            /**
             * Set gender to this Person.
             * Example: Male
             *
             * @return void
             * */
            Character.prototype.setGender = function (value) { this.gender = value; };
            /**
             * @return void
             * */
            Character.prototype.setItem = function (item) {
                this.inventory.setItem(item);
                this.inventory.apply(this);
            };
            /**
             * @param {object} enemy - Enemy {Person} object
             * @param {object} actions
             * @return number
             * */
            Character.prototype.attackTo = function (enemy, actions) {
                var _this = this;
                var fn = {
                    onKill: function () { },
                    onHit: function () { },
                    onBlock: function () { },
                    onMiss: function () { },
                    onError: function () { }
                };
                if (!Game.Helpers.Utils.isObject(actions))
                    actions = {};
                if (!Game.Helpers.Utils.isEmptyObject(actions)) {
                    //if (Helpers.isNumber(actions.combo))
                    if (Game.Helpers.Utils.isFunction(actions.onKill))
                        fn.onKill = actions.onKill;
                    if (Game.Helpers.Utils.isFunction(actions.onHit))
                        fn.onHit = actions.onHit;
                    if (Game.Helpers.Utils.isFunction(actions.onMiss))
                        fn.onMiss = actions.onMiss;
                    if (Game.Helpers.Utils.isFunction(actions.onBlock))
                        fn.onBlock = actions.onBlock;
                    if (Game.Helpers.Utils.isFunction(actions.onError))
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
                    var critical = Game.Helpers.Utils.random(this.getCritical()) * 0.01;
                    var attack = Game.Helpers.Utils.random(this.getAttack(), 20);
                    var finalAttack = attack + (attack * critical);
                    var defense = enemy.getLife() * (Game.Helpers.Utils.random(enemy.getDefense()) * 0.01);
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
                            if (Game.Helpers.Utils.isFunction(callback))
                                callback.call(_this);
                        }
                    };
                }
            };
            return Character;
        }());
        Character_1.Character = Character;
    })(Character = Game.Character || (Game.Character = {}));
})(Game || (Game = {}));
