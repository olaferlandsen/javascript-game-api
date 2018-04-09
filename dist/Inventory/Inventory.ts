///<reference path='../Helpers/Utils.ts'/>
///<reference path='../Character/Character.ts'/>
///<reference path='../Inventory/Item.ts'/>

namespace Game.Inventory {
    export class Inventory{
        private maxWeight   :number;
        private maxSize:number;
        private items       :any;
        private gold        :number;
        private size        :number;
        constructor     ()  {
            this.gold = 0;
            this.items = [];
        }
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
        apply           (player:Character.Character|any):boolean {
            if (Character.Character.isValid(player)) {
                console.log('this.items:', this.items);
                Helpers.Utils.forEach(this.items, function (item:any, index:any) {
                    if (Helpers.Utils.isNumber(item.life)) {
                        player.addLife(item.life);
                    }
                    if (Helpers.Utils.isNumber(item.defense)) {
                        player.addDefense(item.defense);
                    }
                    if (Helpers.Utils.isNumber(item.attack)) {
                        player.addAttack(item.attack);
                    }
                    if (Helpers.Utils.isNumber(item.critical)) {
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
            if (Helpers.Utils.isNull(item) || Helpers.Utils.isUndefined(item)) {
                console.error('No es un objeto');
                return false;
            }
            if (!Helpers.Utils.isObject(item) || Helpers.Utils.isEmptyObject(item)){
                console.error('Objecto vacio');
                return false;
            }
            if (!Helpers.Utils.hasOwnProperty(['name', 'weight', 'size', 'price'], item)){
                console.error('No tiene las propiedades');
                return false;
            }
            return true;
        }
        isSeteable      (item:Inventory.Item|any):boolean {
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

        all ():any {
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
        setItemArray         (items:any) {
            for (let item in items) {
                if (!this.setItem(item)) {
                    return false;
                }
            }
            return true;
        }
    }
}
