///<reference path='../Helpers/Utils.ts'/>
///<reference path='../Character/Character.ts'/>
///<reference path='../Inventory/Item.ts'/>
var Game;
(function (Game) {
    var Inventory;
    (function (Inventory_1) {
        var Inventory = /** @class */ (function () {
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
            /**
             * @param {*} item
             * */
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
        Inventory_1.Inventory = Inventory;
    })(Inventory = Game.Inventory || (Game.Inventory = {}));
})(Game || (Game = {}));
