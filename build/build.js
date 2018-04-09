var Game;
(function (Game) {
    var Helpers;
    (function (Helpers) {
        var Utils = (function () {
            function Utils() {
            }
            Utils.getType = function (value) {
                return typeof value;
            };
            Utils.isFunction = function (value) {
                return typeof value === 'function';
            };
            Utils.isObject = function (value) {
                return null != value && toString.call(value) === '[object Object]';
            };
            Utils.isArray = function (value) {
                if (Array.isArray)
                    return Array.isArray(value);
                return value instanceof Array;
            };
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
            Utils.isString = function (value) {
                return typeof value === 'string';
            };
            Utils.isInteger = function (value) {
                return typeof value === 'number' && Number(value) === value && value % 1 === 0;
            };
            Utils.isFloat = function (value) {
                return typeof value === 'number' && Number(value) === value && value % 1 !== 0;
            };
            Utils.isNumber = function (value) {
                return Utils.isInteger(value) || Utils.isFloat(value);
            };
            Utils.isTrue = function (value) {
                return value === true || value === 1;
            };
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
            Utils.randomArbitrary = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            Utils.randomBetweenPercentageOf = function (value, percentage) {
                if (percentage > 0) {
                    percentage = percentage * 0.01;
                }
                var range = value * percentage;
                var max = value + range;
                var min = max - (range * 2);
                if (max === min) {
                    return max;
                }
                return Utils.randomArbitrary(min, max);
            };
            Utils.hasOwnProperty = function (properties, object) {
                if (!this.isObject(object))
                    throw new Error('Helpers:hasOwnProperty: only accept object');
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
        Helpers.Utils = Utils;
    })(Helpers = Game.Helpers || (Game.Helpers = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Inventory;
    (function (Inventory) {
        var Item = (function () {
            function Item(options) {
                this.name = options.name;
                this.value = options.value;
                this.attack = options.attack;
                this.defense = options.defense;
            }
            Item.prototype.getWeight = function () {
                return this.weight;
            };
            Item.prototype.getSize = function () {
                return this.size;
            };
            return Item;
        }());
        Inventory.Item = Item;
    })(Inventory = Game.Inventory || (Game.Inventory = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Inventory;
    (function (Inventory_1) {
        var Inventory = (function () {
            function Inventory() {
                this.gold = 0;
                this.items = [];
            }
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
            Inventory.prototype.apply = function (player) {
                if (Game.Character.Character.isValid(player)) {
                    console.log('this.items:', this.items);
                    Game.Helpers.Utils.forEach(this.items, function (item, index) {
                        if (Game.Helpers.Utils.isNumber(item.life)) {
                            player.addLife(item.life);
                        }
                        if (Game.Helpers.Utils.isNumber(item.defense)) {
                            player.addDefense(item.defense);
                        }
                        if (Game.Helpers.Utils.isNumber(item.attack)) {
                            player.addAttack(item.attack);
                        }
                        if (Game.Helpers.Utils.isNumber(item.critical)) {
                            player.addCritical(item.critical);
                        }
                    });
                    return true;
                }
                return false;
            };
            Inventory.prototype.isItem = function (item) {
                if (Game.Helpers.Utils.isNull(item) || Game.Helpers.Utils.isUndefined(item)) {
                    console.error('No es un objeto');
                    return false;
                }
                if (!Game.Helpers.Utils.isObject(item) || Game.Helpers.Utils.isEmptyObject(item)) {
                    console.error('Objecto vacio');
                    return false;
                }
                if (!Game.Helpers.Utils.hasOwnProperty(['name', 'weight', 'size', 'price'], item)) {
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
            Inventory.prototype.setItem = function (item) {
                if (!this.isSeteable(item))
                    return false;
                console.info('el item se añadio');
                this.items.push(item);
                return true;
            };
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
        Inventory_1.Inventory = Inventory;
    })(Inventory = Game.Inventory || (Game.Inventory = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Characters;
    (function (Characters) {
        var Wound = (function () {
            function Wound() {
            }
            return Wound;
        }());
        Characters.Wound = Wound;
    })(Characters = Game.Characters || (Game.Characters = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Character;
    (function (Character) {
        var Karma = (function () {
            function Karma(startWith) {
                if (typeof startWith === "number")
                    this._karma = startWith;
                else
                    this._karma = 0;
            }
            Karma.prototype.add = function (quantity) {
                if (typeof quantity === "number")
                    this._karma += quantity;
                else
                    this._karma++;
            };
            Karma.prototype.sub = function (quantity) {
                if (typeof quantity === "number")
                    this._karma -= quantity;
                else
                    this._karma--;
            };
            Karma.prototype.getKarma = function () {
                return this._karma;
            };
            Karma.prototype.addProfile = function (profile, minKarma, maxKarma) {
                this._profiles[profile] = {
                    max: maxKarma,
                    min: minKarma
                };
            };
            Karma.prototype.fetchProfiles = function () {
                return Object.keys(this._profiles);
            };
            Karma.prototype.removeProfile = function (profile) {
                if (!(profile in this._profiles))
                    return false;
                delete this._profiles[profile];
                return true;
            };
            Karma.prototype.updateProfile = function (profile, minKarma, maxKarma) {
                if (!(profile in this._profiles))
                    return false;
                this._profiles[profile] = {
                    min: minKarma,
                    max: (typeof maxKarma === "number" ? maxKarma : minKarma)
                };
                return true;
            };
            Karma.prototype.getProfile = function (profile) {
                if (!(profile in this._profiles))
                    return null;
                return this._profiles[profile];
            };
            Karma.prototype.getMaxProfileKarma = function () {
                var max = 0;
                for (var profile in this._profiles)
                    max = Math.max(max, this._profiles[profile].max);
                return max;
            };
            Karma.prototype.getMinProfileKarma = function () {
                var min = 0;
                for (var profile in this._profiles)
                    min = Math.min(min, this._profiles[profile].min);
                return min;
            };
            Karma.prototype.useProfile = function (profile) {
                if (!(profile in this._profiles))
                    return false;
                this._karma = this._profiles[profile].min;
            };
            return Karma;
        }());
        Character.Karma = Karma;
    })(Character = Game.Character || (Game.Character = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Diseases;
    (function (Diseases_1) {
        var Diseases = (function () {
            function Diseases() {
            }
            Diseases.prototype.create = function () { };
            Diseases.prototype.get = function () { };
            Diseases.prototype.update = function () { };
            Diseases.prototype.remove = function () { };
            return Diseases;
        }());
        Diseases_1.Diseases = Diseases;
    })(Diseases = Game.Diseases || (Game.Diseases = {}));
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Character;
    (function (Character_1) {
        var Character = (function () {
            function Character(info) {
                this.statistics = {
                    buys: 0,
                    kills: 0
                };
                this.life = {
                    current: 0,
                    max: 0
                };
                this.inventory = new Game.Inventory.Inventory();
                if (info.hasOwnProperty('name'))
                    this.setName(info.name);
                if (info.hasOwnProperty('gender'))
                    this.setGender(info.gender);
                if (info.hasOwnProperty('_class'))
                    this.setClass(info._class);
                this.setLife(info.life.max || 0);
                this.setMaxLife(info.life.current || 0);
                this.setAttack(info.attack || 0);
                this.setDefense(info.defense || 0);
                this.setCritical(info.critical || 0);
                this.setAmmunition(info.ammunition || Infinity);
                this.setExperience(info.experience || 0);
                this.inventory.setGold(info.gold || 0);
                this.setSpeed(info.speed || 0);
                this.setLevel(Math.max(1, info.level) || 1);
                if (info.hasOwnProperty('image'))
                    this.setImage(info.image);
                if (info.hasOwnProperty('items'))
                    this.setItem(info.items);
            }
            Character.isValid = function (person) {
                return Game.Helpers.Utils.isObject(person) && Game.Helpers.Utils.hasOwnProperty([
                    'name', 'level', 'life', 'defense', 'attack', 'inventory'
                ], person);
            };
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
            Character.prototype.getName = function () { return this.name; };
            Character.prototype.getGender = function () { return this.gender; };
            Character.prototype.getClass = function () { return this._class; };
            Character.prototype.getImage = function () { return this.image; };
            Character.prototype.getLife = function () {
                return this.life.current;
            };
            Character.prototype.getLifePercentage = function () {
                return this.life.current * 100 / this.life.max;
            };
            Character.prototype.getDefense = function () { return this.defense; };
            Character.prototype.getAttack = function () { return this.attack; };
            Character.prototype.getExperience = function () { return this.exp; };
            Character.prototype.getGold = function () {
                return this.inventory.getGold();
            };
            Character.prototype.getItems = function () { return this.items; };
            Character.prototype.getCritical = function () { return this.critical; };
            Character.prototype.getSpeed = function () { return this.speed; };
            Character.prototype.getAmmunition = function () { return this.ammunition; };
            Character.prototype.getLevel = function () { return this.level; };
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
            Character.prototype.addMaxLife = function (value) {
                this.life.max += Math.max(0, Math.abs(value));
            };
            Character.prototype.addDefense = function (value) { this.defense += Math.max(0, Math.abs(value)); };
            Character.prototype.addAttack = function (value) { this.attack += Math.max(0, Math.abs(value)); };
            Character.prototype.addCritical = function (value) { this.critical += Math.max(0, Math.abs(value)); };
            Character.prototype.addSpeed = function (value) { this.speed += Math.max(0, Math.abs(value)); };
            Character.prototype.addExperience = function (value) { this.exp += Math.max(0, Math.abs(value)); };
            Character.prototype.addGold = function (value) { this.gold += Math.max(0, Math.abs(value)); };
            Character.prototype.addAmmunition = function (value) { this.ammunition += Math.max(0, Math.abs(value)); };
            Character.prototype.addLevel = function (value) {
                this.setLevel(this.getLevel() + Math.abs(value));
            };
            Character.prototype.subLife = function (value) {
                return this.life.current = Math.max(0, (this.life.current - Math.max(0, Math.abs(value))));
            };
            Character.prototype.subMaxLife = function (value) {
                return this.life.max(Math.max(0, (this.life.max - Math.max(0, Math.abs(value)))));
            };
            Character.prototype.subDefense = function (value) {
                return this.setDefense(Math.max(0, (this.defense - Math.max(0, Math.abs(value)))));
            };
            Character.prototype.subAttack = function (value) {
                return this.setAttack(Math.max(0, (this.attack - Math.max(0, Math.abs(value)))));
            };
            Character.prototype.subCritical = function (value) {
                return this.setCritical(Math.max(0, (this.critical - Math.max(0, Math.abs(value)))));
            };
            Character.prototype.subSpeed = function (value) {
                return this.setSpeed(Math.max(0, (this.speed - Math.max(0, Math.abs(value)))));
            };
            Character.prototype.subAmmunition = function (value) {
                return this.setAmmunition(Math.max(0, (this.ammunition - Math.max(0, Math.abs(value)))));
            };
            Character.prototype.subExperience = function (value) {
                return this.setExperience(Math.max(0, (this.exp - Math.max(0, Math.abs(value)))));
            };
            Character.prototype.subLevel = function (value) {
                return this.setLevel(this.level - Math.max(0, Math.abs(value)));
            };
            Character.prototype.isAlive = function () { return this.getLife() > 0; };
            Character.prototype.isDead = function () { return this.getLife() === 0; };
            Character.prototype.kill = function () { this.setLife(0); return true; };
            Character.prototype.setLife = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.life.current = Math.max(value, 0);
            };
            Character.prototype.setMaxLife = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.life.max = Math.max(value, 0);
            };
            Character.prototype.setDefense = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.defense = value;
            };
            Character.prototype.setAttack = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.attack = value;
            };
            Character.prototype.setCritical = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.critical = value;
            };
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
            Character.prototype.setGold = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.gold = value;
            };
            Character.prototype.setAmmunition = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.ammunition = value;
            };
            Character.prototype.setLevel = function (value) {
                if (!Game.Helpers.Utils.isNumber(value) || !value)
                    value = 0;
                this.level = Math.max(1, value);
            };
            Character.prototype.setImage = function (value) { this.image = value; };
            Character.prototype.setName = function (value) { this.name = value; };
            Character.prototype.setClass = function (value) { this._class = value; };
            Character.prototype.setGender = function (value) { this.gender = value; };
            Character.prototype.setItem = function (item) {
                this.inventory.setItem(item);
                this.inventory.apply(this);
            };
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
var Game;
(function (Game) {
    var Scenario;
    (function (Scenario_1) {
        var Scenario = (function () {
            function Scenario(key, profile) {
                this.profiles = {};
                if (key && profile)
                    this.create(key, profile);
            }
            Scenario.prototype.get = function (key) {
                if (!(key in this.profiles))
                    return null;
                return this.profiles[key];
            };
            Scenario.prototype.create = function (key, profile) {
                if (key in this.profiles)
                    return false;
                this.profiles[key] = profile;
                return true;
            };
            Scenario.prototype.update = function (key, profile) {
                if (!(key in this.profiles))
                    return false;
                this.profiles[key] = profile;
                return true;
            };
            Scenario.prototype.rendomize = function () {
                return {
                    humidity: Game.Helpers.Utils.randomArbitrary(0, 100),
                    precipitation: Game.Helpers.Utils.randomArbitrary(0, 100),
                    pressure: Game.Helpers.Utils.randomArbitrary(0, 100),
                    temperature: Game.Helpers.Utils.randomArbitrary(0, 100)
                };
            };
            Scenario.prototype.randomizeProfile = function (key, percentage, update) {
                if (typeof percentage !== "number") {
                    percentage = Number(percentage) || 20;
                }
                var profile = this.get(key);
                if (!profile)
                    return null;
                profile.temperature = Game.Helpers.Utils.randomBetweenPercentageOf(profile.temperature, percentage);
                profile.pressure = Game.Helpers.Utils.randomBetweenPercentageOf(profile.pressure, percentage);
                profile.humidity = Game.Helpers.Utils.randomBetweenPercentageOf(profile.humidity, percentage);
                profile.precipitation = Game.Helpers.Utils.randomBetweenPercentageOf(profile.precipitation, percentage);
                if (update === true) {
                    this.update(key, profile);
                }
                return profile;
            };
            return Scenario;
        }());
        Scenario_1.Scenario = Scenario;
    })(Scenario = Game.Scenario || (Game.Scenario = {}));
})(Game || (Game = {}));
var Character = Game.Character.Character;
var Scenario = Game.Scenario.Scenario;
var scenarios = new Scenario();
scenarios.create("casa", {
    precipitation: 30,
    humidity: 10,
    temperature: 26,
    pressure: 15
});
var scenario = scenarios.get("casa");
console.log("Ambiental #" + i, scenario);
for (var i = 0; i < 10; i++) {
    scenarios.randomizeProfile("casa", 30, true);
    console.log("Ambiental #" + (i + 1), scenario);
}
//# sourceMappingURL=build.js.map