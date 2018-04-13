var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("Ambient", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ambient = (function () {
        function Ambient() {
        }
        return Ambient;
    }());
    exports.Ambient = Ambient;
});
define("Messages", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Messages = (function () {
        function Messages() {
        }
        return Messages;
    }());
    exports.Messages = Messages;
});
define("Special", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Special = (function () {
        function Special() {
        }
        return Special;
    }());
    exports.Special = Special;
});
define("Annotations/Debug", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Debug() {
        var page = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            page[_i] = arguments[_i];
        }
        console.log("page:", page);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("any:", args);
        };
    }
    exports.Debug = Debug;
});
define("Core/Interface/Page", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Annotations/Page", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Page() {
        var page = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            page[_i] = arguments[_i];
        }
        console.log("page:", page);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log("any:", args);
        };
    }
    exports.Page = Page;
});
define("Annotations/Annotations", ["require", "exports", "Annotations/Debug", "Annotations/Page"], function (require, exports, Debug_1, Page_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Debug = Debug_1.Debug;
    exports.Page = Page_1.Page;
});
define("Core/Navigation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Navigation = (function () {
        function Navigation() {
        }
        Navigation.prototype.next = function () { };
        Navigation.prototype.prev = function () { };
        Navigation.prototype.first = function () { };
        Navigation.prototype.last = function () { };
        Navigation.prototype.goToByIndex = function (index) { };
        Navigation.prototype.goToPage = function (page) {
        };
        return Navigation;
    }());
    exports.Navigation = Navigation;
});
define("Core/Scope", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scope = (function () {
        function Scope() {
        }
        Scope.prototype.cound = function () {
            return Object.keys(this).length;
        };
        return Scope;
    }());
    exports.Scope = Scope;
});
define("Core/Core", ["require", "exports", "Core/Navigation", "Core/Scope"], function (require, exports, Navigation_1, Scope_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Navigation = Navigation_1.Navigation;
    exports.Scope = Scope_1.Scope;
});
define("Public/Pages/Dashboard/Dashboard", ["require", "exports", "Annotations/Annotations", "Core/Core"], function (require, exports, Annotations_1, Core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DashboardPage = (function () {
        function DashboardPage(scope, navigation) {
            this.scope = scope;
            this.navigation = navigation;
        }
        DashboardPage.prototype.viewDidLoad = function () {
            this.scope.name = "";
        };
        __decorate([
            Annotations_1.Debug,
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], DashboardPage.prototype, "viewDidLoad", null);
        DashboardPage = __decorate([
            Annotations_1.Page,
            Annotations_1.Debug,
            __metadata("design:paramtypes", [Core_1.Scope, Core_1.Navigation])
        ], DashboardPage);
        return DashboardPage;
    }());
    exports.DashboardPage = DashboardPage;
});
define("Helpers/Dom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Dom = (function () {
        function Dom() {
        }
        Dom.createTag = function (tagName, properties) {
            var element = document.registerElement(tagName, {
                prototype: Object.create(HTMLElement.prototype)
            });
            if (typeof properties === "object" && !Array.isArray(properties) && properties !== null) {
                for (var property in properties)
                    element[property] = properties[property];
            }
            return element;
        };
        Dom.createElement = function (tagName, properties) {
            var element = document.createElement(tagName);
            if (typeof properties === "object" && !Array.isArray(properties) && properties !== null) {
                for (var property in properties)
                    element[property] = properties[property];
            }
            return element;
        };
        Dom.exists = function (selector) {
            if (selector instanceof Element)
                return true;
            return Dom.findAll(selector).length > 0;
        };
        Dom.find = function (selector, callback) {
            var element = document.querySelector(selector);
            if (element !== null && typeof callback !== "undefined")
                return callback.apply(null, [element]);
            return element;
        };
        Dom.findAll = function (selector, callback) {
            var elements = document.querySelectorAll(selector);
            if (elements !== null && typeof callback !== "undefined")
                callback.apply(null, [elements]);
            return elements;
        };
        Dom.delete = function (selector) {
            if (selector instanceof Element)
                selector.parentNode.removeChild(selector);
            else
                Dom.find(selector, function (e) { return e.parentNode.removeChild(e); });
        };
        Dom.copy = function (selector) {
            if (selector instanceof Element)
                return selector.cloneNode(true);
            else
                return Dom.find(selector);
        };
        Dom.clone = function (selector, target) {
            var copy = Dom.copy(selector);
            if (!copy)
                throw new Error(":target: element don't exists");
            if (target instanceof Element)
                target.appendChild(copy);
            else
                Dom.find(selector, function (e) { return e.appendChild(copy); });
        };
        Dom.appendTo = function (selector, target) {
        };
        Dom.preprendTo = function () {
        };
        Dom.addClass = function (selector, className) {
            if (selector instanceof Element)
                selector.classList.add(className);
            else
                Dom.find(selector, function (e) { return e.classList.add(className); });
        };
        Dom.removeClass = function (selector, className) {
            if (selector instanceof Element)
                selector.classList.remove(className);
            else
                Dom.find(selector, function (e) { return e.classList.remove(className); });
        };
        Dom.classList = function (selector) {
            var list = [];
            if (selector instanceof Element) {
                for (var className in selector.classList)
                    list.push(className);
                return list;
            }
            else
                return Dom.find(selector, function (e) {
                    var list = [];
                    for (var className in e.classList)
                        list.push(className);
                    return list;
                });
        };
        Dom.attributes = function () { };
        Dom.removeAttribute = function () { };
        Dom.addAtrribute = function () { };
        Dom.moveTo = function () { };
        Dom.bind = function (selector, event, callback) {
            var alternatives = {
                'click': "onclick",
                'blclick': "ondblclick",
                'doubleclick': "ondblclick",
                'twoclick': "ondblclick",
                'paste': "onpaste"
            };
            event = String(event).replace(/\s+/, '').trim().toLowerCase();
            if (event in alternatives)
                event = alternatives[event];
            Dom.find(selector, function (e) { return e.addEventListener(event, callback); });
        };
        Dom.one = Dom.find;
        Dom.element = Dom.find;
        Dom.elements = Dom.findAll;
        Dom.all = Dom.findAll;
        Dom.remove = Dom.delete;
        Dom.removeAttr = Dom.removeAttribute;
        Dom.addAttr = Dom.addAtrribute;
        Dom.attrs = Dom.attributes;
        Dom.classes = Dom.classList;
        Dom.append = Dom.appendTo;
        Dom.prepend = Dom.preprendTo;
        Dom.on = Dom.bind;
        Dom.registerElement = Dom.createTag;
        return Dom;
    }());
    exports.Dom = Dom;
});
define("Core/Root", ["require", "exports", "Annotations/Debug", "Public/Pages/Dashboard/Dashboard", "Helpers/Dom"], function (require, exports, Debug_2, Dashboard_1, Dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Root = (function () {
        function Root() {
            var _this = this;
            this.id = "root";
            this.tagName = "game";
            this.pages = [];
            this.rootPage = Dashboard_1.DashboardPage;
            Dom_1.Dom.delete("#" + this.id);
            Dom_1.Dom.find("body", function (e) { return e.appendChild(Dom_1.Dom.createTag(_this.tagName, {
                id: _this.id
            })); });
            var _loop_1 = function (page) {
                Dom_1.Dom.find(this_1.tagName, function (e) { return e.appendChild(Dom_1.Dom.createTag(page.name)); });
            };
            var this_1 = this;
            for (var _i = 0, _a = this.pages; _i < _a.length; _i++) {
                var page = _a[_i];
                _loop_1(page);
            }
        }
        Root_1 = Root;
        Root.run = function () {
            return new Root_1();
        };
        __decorate([
            Debug_2.Debug,
            __metadata("design:type", String)
        ], Root.prototype, "id", void 0);
        __decorate([
            Debug_2.Debug,
            __metadata("design:type", String)
        ], Root.prototype, "tagName", void 0);
        __decorate([
            Debug_2.Debug,
            __metadata("design:type", Array)
        ], Root.prototype, "pages", void 0);
        __decorate([
            Debug_2.Debug,
            __metadata("design:type", Object)
        ], Root.prototype, "rootPage", void 0);
        Root = Root_1 = __decorate([
            Debug_2.Debug,
            __metadata("design:paramtypes", [])
        ], Root);
        return Root;
        var Root_1;
    }());
    exports.Root = Root;
});
define("index", ["require", "exports", "Core/Root"], function (require, exports, Root_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Root_2.Root.run();
});
define("Character/Karma", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Karma = Karma;
});
define("Character/Wound", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Wound = (function () {
        function Wound() {
        }
        return Wound;
    }());
    exports.Wound = Wound;
});
define("Diseases/Diseases", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Diseases = (function () {
        function Diseases() {
        }
        Diseases.prototype.create = function () { };
        Diseases.prototype.get = function () { };
        Diseases.prototype.update = function () { };
        Diseases.prototype.remove = function () { };
        return Diseases;
    }());
    exports.Diseases = Diseases;
});
define("Helpers/Utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        Utils.random = function (value, _max) {
            var max = (typeof _max !== "number") ? 0 : _max;
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
            return false;
        };
        return Utils;
    }());
    exports.Utils = Utils;
});
define("Inventory/InventoryItem", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InventoryItem = (function () {
        function InventoryItem(options) {
            this.name = options.name;
            this.value = options.value;
            this.attack = options.attack;
            this.defense = options.defense;
        }
        InventoryItem.prototype.getWeight = function () {
            return this.weight;
        };
        InventoryItem.prototype.getSize = function () {
            return this.size;
        };
        return InventoryItem;
    }());
    exports.InventoryItem = InventoryItem;
});
define("Inventory/Inventory", ["require", "exports", "Character/Character", "Helpers/Utils"], function (require, exports, Character_1, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            if (Character_1.Character.isValid(player)) {
                console.log('this.items:', this.items);
                Utils_1.Utils.forEach(this.items, function (item, index) {
                    if (Utils_1.Utils.isNumber(item.life)) {
                        player.addLife(item.life);
                    }
                    if (Utils_1.Utils.isNumber(item.defense)) {
                        player.addDefense(item.defense);
                    }
                    if (Utils_1.Utils.isNumber(item.attack)) {
                        player.addAttack(item.attack);
                    }
                    if (Utils_1.Utils.isNumber(item.critical)) {
                        player.addCritical(item.critical);
                    }
                });
                return true;
            }
            return false;
        };
        Inventory.prototype.isItem = function (item) {
            if (Utils_1.Utils.isNull(item) || Utils_1.Utils.isUndefined(item)) {
                console.error('No es un objeto');
                return false;
            }
            if (!Utils_1.Utils.isObject(item) || Utils_1.Utils.isEmptyObject(item)) {
                console.error('Objecto vacio');
                return false;
            }
            if (!Utils_1.Utils.hasOwnProperty(['name', 'weight', 'size', 'price'], item)) {
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
    exports.Inventory = Inventory;
});
define("Character/Character", ["require", "exports", "Inventory/Inventory", "Helpers/Utils"], function (require, exports, Inventory_1, Utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.inventory = new Inventory_1.Inventory();
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
            return Utils_2.Utils.isObject(person) && Utils_2.Utils.hasOwnProperty([
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
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.life.current = Math.max(value, 0);
        };
        Character.prototype.setMaxLife = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.life.max = Math.max(value, 0);
        };
        Character.prototype.setDefense = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.defense = value;
        };
        Character.prototype.setAttack = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.attack = value;
        };
        Character.prototype.setCritical = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.critical = value;
        };
        Character.prototype.setSpeed = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.speed = value;
        };
        Character.prototype.setExperience = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.exp = value;
        };
        Character.prototype.setGold = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.gold = value;
        };
        Character.prototype.setAmmunition = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
                value = 0;
            this.ammunition = value;
        };
        Character.prototype.setLevel = function (value) {
            if (!Utils_2.Utils.isNumber(value) || !value)
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
            if (!Utils_2.Utils.isObject(actions))
                actions = {};
            if (!Utils_2.Utils.isEmptyObject(actions)) {
                if (Utils_2.Utils.isFunction(actions.onKill))
                    fn.onKill = actions.onKill;
                if (Utils_2.Utils.isFunction(actions.onHit))
                    fn.onHit = actions.onHit;
                if (Utils_2.Utils.isFunction(actions.onMiss))
                    fn.onMiss = actions.onMiss;
                if (Utils_2.Utils.isFunction(actions.onBlock))
                    fn.onBlock = actions.onBlock;
                if (Utils_2.Utils.isFunction(actions.onError))
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
                var critical = Utils_2.Utils.random(this.getCritical()) * 0.01;
                var attack = Utils_2.Utils.random(this.getAttack(), 20);
                var finalAttack = attack + (attack * critical);
                var defense = enemy.getLife() * (Utils_2.Utils.random(enemy.getDefense()) * 0.01);
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
                        if (Utils_2.Utils.isFunction(callback))
                            callback.call(_this);
                    }
                };
            }
        };
        return Character;
    }());
    exports.Character = Character;
});
define("Character/Group", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Group = (function () {
        function Group(characters) {
            if (characters) {
                this.characters = characters;
            }
        }
        Group.prototype.setName = function (name) {
            this.name = name;
        };
        Group.prototype.setDescription = function (description) {
            this.description = description;
        };
        Group.prototype.addCharacter = function (character) {
            this.characters.push(character);
            return (this.characters.length - 1);
        };
        Group.prototype.removeCharacter = function (index) {
            this.characters.slice(index, 1);
        };
        Group.prototype.updateCharacter = function (index, character) {
            this.characters[index] = character;
        };
        return Group;
    }());
    exports.Group = Group;
});
define("Model/Model", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Model = (function () {
        function Model() {
        }
        return Model;
    }());
    exports.Model = Model;
});
define("Scenario/Climate", ["require", "exports", "Helpers/Utils"], function (require, exports, Utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Climate = (function () {
        function Climate() {
            this.generate(true);
        }
        Climate.prototype.generate = function (update) {
            var climate = {
                humidity: Utils_3.Utils.randomArbitrary(0, 100),
                precipitation: Utils_3.Utils.randomArbitrary(0, 100),
                pressure: Utils_3.Utils.randomArbitrary(0, 100),
                temperature: Utils_3.Utils.randomArbitrary(0, 100)
            };
            if (update === true) {
                this.humidity = climate.humidity;
                this.precipitation = climate.precipitation;
                this.pressure = climate.pressure;
                this.temperature = climate.temperature;
            }
            return climate;
        };
        Climate.prototype.randomize = function (percentage, update) {
            if (typeof percentage !== "number") {
                percentage = Number(percentage) || 20;
            }
            var climate = {
                humidity: this.humidity,
                precipitation: this.precipitation,
                pressure: this.pressure,
                temperature: this.temperature
            };
            climate.temperature = Utils_3.Utils.randomBetweenPercentageOf(climate.temperature, percentage);
            climate.pressure = Utils_3.Utils.randomBetweenPercentageOf(climate.pressure, percentage);
            climate.humidity = Utils_3.Utils.randomBetweenPercentageOf(climate.humidity, percentage);
            climate.precipitation = Utils_3.Utils.randomBetweenPercentageOf(climate.precipitation, percentage);
            if (update === true) {
                this.humidity = climate.humidity;
                this.precipitation = climate.precipitation;
                this.pressure = climate.pressure;
                this.temperature = climate.temperature;
            }
            return climate;
        };
        return Climate;
    }());
    exports.Climate = Climate;
});
define("Scenario/Location", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Location = (function () {
        function Location(options) {
            this.icons = {
                default: ''
            };
            if ('name' in options)
                this.name = options.name;
            if ('x' in options)
                this.x = options.x;
            if ('y' in options)
                this.y = options.y;
        }
        return Location;
    }());
    exports.Location = Location;
});
define("Scenario/Scenario", ["require", "exports", "Helpers/Utils", "Scenario/Location", "Scenario/Climate"], function (require, exports, Utils_4, Location_1, Climate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scenario = (function () {
        function Scenario(width, height) {
            this.spaces = [];
            this.enemies = [];
            this.alies = [];
            this.neutral = [];
            if (typeof width === "number") {
                this.width = width;
                if (typeof height !== "number") {
                    this.height = width;
                }
                else {
                    this.height = height;
                }
                this.process(width, height);
            }
        }
        Scenario.prototype.process = function (width, height) {
            for (var row = 0; row < height; row++) {
                var cells = [];
                for (var col = 0; col < width; col++) {
                    var locations = [];
                    for (var l = 0; l < Math.random() + 2; l++) {
                        locations.push(new Location_1.Location({
                            name: "Location " + row + col + l,
                            x: Utils_4.Utils.randomArbitrary(0, 35),
                            y: Utils_4.Utils.randomArbitrary(0, 35)
                        }));
                    }
                    cells.push({
                        name: null,
                        description: null,
                        deleted: false,
                        x: row,
                        y: col,
                        key: (row + "_" + col),
                        climate: new Climate_1.Climate(),
                        locations: locations
                    });
                }
                this.spaces.push(cells);
            }
        };
        Scenario.prototype.fetch = function () {
            return this.spaces;
        };
        Scenario.prototype.assingEnemy = function () {
        };
        return Scenario;
    }());
    exports.Scenario = Scenario;
});
define("Services/Metadata/Page", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Page = (function () {
        function Page() {
        }
        Page.register = function (title) {
        };
        Page.KEYS = {
            PAGE: ''
        };
        return Page;
    }());
    exports.Page = Page;
});
//# sourceMappingURL=game.js.map