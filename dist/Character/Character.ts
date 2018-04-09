///<reference path='../Helpers/Utils.ts'/>
///<reference path='../Inventory/Inventory.ts'/>
///<reference path='Wound.ts'/>
///<reference path='Karma.ts'/>
///<reference path='../Diseases/Diseases.ts'/>

namespace Game.Character {
    export class Character {
        private diseases:Game.Diseases.Diseases;
        private wounds:Game.Characters.Wound;
        private karma : Karma;
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
        private inventory:Inventory.Inventory;
        constructor         (info: any) {
            //this.karma = new Karma();
            this.statistics = {
                buys:0,
                kills:0
            };
            this.life = {
                current :   0,
                max     :   0
            };
            // set person inventory
            this.inventory = new Inventory.Inventory();

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
            return Helpers.Utils.isObject(person) && Helpers.Utils.hasOwnProperty([
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
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.life.current = Math.max(value, 0);
        }
        /**
         * @return void
         * */
        setMaxLife             (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.life.max = Math.max(value, 0);
        }
        /**
         * @return void
         * */
        setDefense          (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.defense = value
        }
        /**
         * @return void
         * */
        setAttack           (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.attack = value
        }
        /**
         * @return void
         * */
        setCritical         (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.critical = value
        }
        /**
         * @return void
         * */
        setSpeed            (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.speed= value
        }
        setExperience       (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.exp= value
        }
        /**
         * @return void
         * */
        setGold             (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.gold= value
        }
        /**
         * @return void
         * */
        setAmmunition       (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
            this.ammunition= value
        }
        /**
         * @return void
         * */
        setLevel       (value:number) {
            if (!Helpers.Utils.isNumber(value) || !value) value = 0;
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
            if (!Helpers.Utils.isObject(actions)) actions = {};
            if (!Helpers.Utils.isEmptyObject(actions)) {
                //if (Helpers.isNumber(actions.combo))
                if (Helpers.Utils.isFunction(actions.onKill)) fn.onKill = actions.onKill;
                if (Helpers.Utils.isFunction(actions.onHit)) fn.onHit = actions.onHit;
                if (Helpers.Utils.isFunction(actions.onMiss)) fn.onMiss = actions.onMiss;
                if (Helpers.Utils.isFunction(actions.onBlock)) fn.onBlock = actions.onBlock;
                if (Helpers.Utils.isFunction(actions.onError)) fn.onError = actions.onError;
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
                let critical = Helpers.Utils.random(this.getCritical()) * 0.01;
                let attack = Helpers.Utils.random(this.getAttack(), 20);
                let finalAttack = attack + (attack * critical);

                let defense = enemy.getLife() * (Helpers.Utils.random(enemy.getDefense()) * 0.01);
                let finalDamage = Math.max(0, attack - defense);
                enemy.subLife(finalDamage);

                if (enemy.isDead()) {
                    fn.onKill.call(enemy);
                }
                else if (defense > finalAttack) {
                    fn.onBlock.call(enemy, defense, finalDamage)
                }
                else if (finalAttack > 0) {
                    fn.onHit.call(enemy, finalAttack);
                }
                else {
                    fn.onMiss.call(enemy, finalAttack);
                }
                //
                return {
                    then : (callback: Function):any => {
                        if (Helpers.Utils.isFunction(callback)) callback.call(this);
                    }
                }

            }
        }
    }
}
