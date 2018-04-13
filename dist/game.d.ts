declare module "Ambient" {
    export class Ambient {
        private rain;
        constructor();
    }
}
declare module "Messages" {
    export class Messages {
    }
}
declare module "Special" {
    export class Special {
        constructor();
    }
}
declare module "Annotations/Debug" {
    export function Debug(...page: any[]): any;
}
declare module "Core/Interface/Page" {
    export interface IPage {
        [key: string]: any;
        viewDidLoad?(): void;
        viewWillLoad?(): void;
        viewDidEnter?(): void;
        viewWillEnter?(): void;
        viewDidLeave?(): void;
        viewWillLeave?(): void;
        viewDidDestroy?(): void;
        viewWillDestroy?(): void;
        viewDidUnload?(): void;
        viewWillUnload?(): void;
        viewDidUnload?(): void;
        viewWillUnload?(): void;
    }
}
declare module "Annotations/Page" {
    export function Page(...page: any[]): any;
}
declare module "Annotations/Annotations" {
    export { Debug } from "Annotations/Debug";
    export { Page } from "Annotations/Page";
}
declare module "Core/Navigation" {
    export class Navigation {
        next(): void;
        prev(): void;
        first(): void;
        last(): void;
        goToByIndex(index: number): void;
        goToPage(page: any): void;
    }
}
declare module "Core/Scope" {
    export class Scope {
        [key: string]: any;
        protected cound(): number;
    }
}
declare module "Core/Core" {
    export { Navigation } from "Core/Navigation";
    export { Scope } from "Core/Scope";
    export { IPage } from "Core/Interface/Page";
}
declare module "Public/Pages/Dashboard/Dashboard" {
    import { Scope, Navigation, IPage } from "Core/Core";
    export class DashboardPage implements IPage {
        scope: Scope;
        navigation: Navigation;
        constructor(scope: Scope, navigation: Navigation);
        viewDidLoad(): void;
    }
}
declare module "Helpers/Dom" {
    export interface IDomProperties {
        [key: string]: any;
    }
    export class Dom {
        static one: typeof Dom.find;
        static element: typeof Dom.find;
        static elements: typeof Dom.findAll;
        static all: typeof Dom.findAll;
        static remove: typeof Dom.delete;
        static removeAttr: typeof Dom.removeAttribute;
        static addAttr: typeof Dom.addAtrribute;
        static attrs: typeof Dom.attributes;
        static classes: typeof Dom.classList;
        static append: typeof Dom.appendTo;
        static prepend: typeof Dom.preprendTo;
        static on: typeof Dom.bind;
        static registerElement: typeof Dom.createTag;
        static createTag(tagName: string, properties?: IDomProperties): Element;
        static createElement(tagName: string, properties?: IDomProperties): Element;
        static exists(selector: string | Element): boolean;
        static find(selector: string, callback?: (element: Element) => void): Element | any;
        static findAll(selector: string, callback?: (element: Element) => void): NodeListOf<Element> | null;
        static delete(selector: string | Element): void;
        static copy(selector: string | Element): any;
        static clone(selector: Element | string, target: Element | string): void;
        static appendTo(selector: string | Element, target: string | Element): void;
        static preprendTo(): void;
        static addClass(selector: string | Element, className: string): void;
        static removeClass(selector: string | Element, className: string): void;
        static classList(selector: Element | string): string[];
        static attributes(): void;
        static removeAttribute(): void;
        static addAtrribute(): void;
        static moveTo(): void;
        static bind(selector: string | Element, event: string, callback: (...args: any[]) => void): void;
    }
}
declare module "Core/Root" {
    import { IPage } from "Core/Interface/Page";
    export class Root {
        protected id: string;
        protected tagName: string;
        protected pages: IPage[];
        protected rootPage: IPage;
        constructor();
        static run(): Root;
    }
}
declare module "index" { }
declare module "Character/Karma" {
    export class Karma {
        private _karma;
        private _profiles;
        constructor(startWith?: number);
        add(quantity?: number): void;
        sub(quantity?: number): void;
        getKarma(): number;
        addProfile(profile: string, minKarma: number, maxKarma: number): void;
        fetchProfiles(): string[];
        removeProfile(profile: string): boolean;
        updateProfile(profile: string, minKarma: number, maxKarma?: number): boolean;
        getProfile(profile: string): {
            min: number;
            max: number;
        } | null;
        getMaxProfileKarma(): number;
        getMinProfileKarma(): number;
        useProfile(profile: string): false | undefined;
    }
}
declare module "Character/Wound" {
    export class Wound {
        constructor();
    }
}
declare module "Diseases/Diseases" {
    export interface IDiseasesScenario {
        precipitation: {
            max: number;
            min: number;
        };
        temperature: {
            max: number;
            min: number;
        };
        pressure: {
            max: number;
            min: number;
        };
        humidity: {
            max: number;
            min: number;
        };
    }
    export interface IDiseases {
        name: string;
        scenario: IDiseasesScenario;
    }
    export class Diseases {
        create(): void;
        get(): void;
        update(): void;
        remove(): void;
    }
}
declare module "Helpers/Utils" {
    export class Utils {
        static getType(value: any): string;
        static isFunction(value: any): boolean;
        static isObject(value: any): boolean;
        static isArray(value: any): boolean;
        static isEmpty(value: any): boolean;
        static isEmptyObject(value: any): boolean;
        static isString(value: any): boolean;
        static isInteger(value: any): boolean;
        static isFloat(value: any): boolean;
        static isNumber(value: any): boolean;
        static isTrue(value: any): boolean;
        static isFalse(value: any): boolean;
        static isRegExp(value: any): boolean;
        static isDate(value: any): boolean;
        static isNull(value: any): boolean;
        static isUndefined(value: any): boolean;
        static forEach(value: any, callback: Function): void;
        static random(value: any, _max?: number): any;
        static randomArbitrary(min: number, max: number): number;
        static randomBetweenPercentageOf(value: number, percentage: number): number;
        static hasOwnProperty(properties: any, object: Object): boolean;
    }
}
declare module "Inventory/InventoryItem" {
    export class InventoryItem {
        private name;
        private value;
        private weight;
        private size;
        private type;
        private defense;
        private attack;
        constructor(options: any);
        getWeight(): number;
        getSize(): number;
    }
}
declare module "Inventory/Inventory" {
    import { Character } from "Character/Character";
    import { InventoryItem } from "Inventory/InventoryItem";
    export class Inventory {
        private maxWeight;
        private maxSize;
        private items;
        private gold;
        private size;
        constructor();
        getGold(): number;
        setGold(value: number): boolean;
        addGold(value: number): boolean;
        subGold(value: number): boolean;
        apply(player: Character | any): boolean;
        isItem(item: any | Object): boolean;
        isSeteable(item: InventoryItem | any): boolean;
        all(): any;
        getWeightCarry(): number;
        getMaxSize(): number;
        getSizeCarry(): number;
        getMaxWeight(): number;
        getItem(): void;
        getItems(): void;
        setItem(item: any): boolean;
        setItemArray(items: any): boolean;
    }
}
declare module "Character/Character" {
    export class Character {
        private diseases;
        private wounds;
        private karma;
        private statistics;
        private name;
        private level;
        private gender;
        private _class;
        private life;
        private defense;
        private attack;
        private critical;
        private speed;
        private ammunition;
        private image;
        private exp;
        private gold;
        private items;
        private inventory;
        private hungry;
        constructor(info: any);
        static isValid(person: any): boolean;
        getInfo(): any;
        getName(): string;
        getGender(): string;
        getClass(): string;
        getImage(): any;
        getLife(): number;
        getLifePercentage(): number;
        getDefense(): number;
        getAttack(): number;
        getExperience(): number;
        getGold(): number;
        getItems(): any;
        getCritical(): number;
        getSpeed(): number;
        getAmmunition(): number;
        getLevel(): number;
        addLife(value: number): void;
        addMaxLife(value: number): void;
        addDefense(value: number): void;
        addAttack(value: number): void;
        addCritical(value: number): void;
        addSpeed(value: number): void;
        addExperience(value: number): void;
        addGold(value: number): void;
        addAmmunition(value: number): void;
        addLevel(value: number): void;
        subLife(value: number): number;
        subMaxLife(value: number): any;
        subDefense(value: number): void;
        subAttack(value: number): void;
        subCritical(value: number): void;
        subSpeed(value: number): void;
        subAmmunition(value: number): void;
        subExperience(value: number): void;
        subLevel(value: number): void;
        isAlive(): boolean;
        isDead(): boolean;
        kill(): boolean;
        setLife(value: number): void;
        setMaxLife(value: number): void;
        setDefense(value: number): void;
        setAttack(value: number): void;
        setCritical(value: number): void;
        setSpeed(value: number): void;
        setExperience(value: number): void;
        setGold(value: number): void;
        setAmmunition(value: number): void;
        setLevel(value: number): void;
        setImage(value: string): void;
        setName(value: string): void;
        setClass(value: string): void;
        setGender(value: string): void;
        setItem(item: any): void;
        attackTo(enemy: any, actions: any): any;
    }
}
declare module "Character/Group" {
    import { Character } from "Character/Character";
    export class Group {
        private name;
        private description;
        private characters;
        constructor(characters?: Character[]);
        setName(name: string): void;
        setDescription(description: string): void;
        addCharacter(character: Character): number;
        removeCharacter(index: number): void;
        updateCharacter(index: number, character: Character): void;
    }
}
declare module "Model/Model" {
    export class Model {
        constructor();
    }
}
declare module "Scenario/Climate" {
    export interface IClimateProfile {
        precipitation: number;
        temperature: number;
        pressure: number;
        humidity: number;
    }
    export class Climate {
        precipitation: number;
        temperature: number;
        pressure: number;
        humidity: number;
        constructor();
        generate(update?: boolean): IClimateProfile;
        randomize(percentage?: number, update?: boolean): IClimateProfile;
    }
}
declare module "Scenario/Location" {
    export class Location {
        name: number;
        x: number;
        y: number;
        icons: {
            default: string;
        };
        constructor(options: any);
    }
}
declare module "Scenario/Scenario" {
    import { Location } from "Scenario/Location";
    export interface IScenarioSpace {
        name: string;
        climate: any;
        key: string;
        description: string;
        deleted?: boolean;
        x: number;
        y: number;
        locations: Location[];
    }
    export class Scenario {
        private width;
        private height;
        private spaces;
        private enemies;
        private alies;
        private neutral;
        constructor(width: number, height?: number);
        process(width: number, height: number): void;
        fetch(): Array<IScenarioSpace[]>;
        assingEnemy(): void;
    }
}
declare module "Services/Metadata/Page" {
    export class Page {
        static readonly KEYS: {
            PAGE: string;
        };
        static register(title: string): void;
    }
}
