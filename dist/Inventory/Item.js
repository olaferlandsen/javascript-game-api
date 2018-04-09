var Game;
(function (Game) {
    var Inventory;
    (function (Inventory) {
        var Item = /** @class */ (function () {
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
        Inventory.Item = Item;
    })(Inventory = Game.Inventory || (Game.Inventory = {}));
})(Game || (Game = {}));
