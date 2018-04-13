export class Karma {
    private _karma:number;
    private _profiles: {
        [profile : string] : {
            max : number,
            min: number
        }
    };
    public constructor (startWith?:number) {
        if (typeof startWith === "number") this._karma = startWith;
        else this._karma = 0;
    }
    public add (quantity?:number):void {
        if (typeof quantity === "number") this._karma += quantity;
        else this._karma++;
    }
    public sub (quantity?:number):void {
        if (typeof quantity === "number") this._karma -= quantity;
        else this._karma--;
    }
    public getKarma ():number {
        return this._karma;
    }
    public addProfile (profile:string, minKarma:number, maxKarma:number):void {
        this._profiles[profile] = {
            max: maxKarma,
            min: minKarma
        };
    }
    public fetchProfiles ():string[] {
        return Object.keys(this._profiles);
    }
    public removeProfile (profile:string):boolean {
        if (!(profile in this._profiles)) return false;
        delete this._profiles[profile];
        return true;
    }
    public updateProfile (profile:string, minKarma:number, maxKarma?:number) {
        if (!(profile in this._profiles)) return false;
        this._profiles[profile] = {
            min: minKarma,
            max: (typeof maxKarma === "number" ? maxKarma: minKarma)
        };
        return true;
    }
    public getProfile (profile:string):{min:number, max:number}|null {
        if (!(profile in this._profiles)) return null;
        return this._profiles[profile];
    }
    public getMaxProfileKarma ():number {
        let max = 0;
        for (let profile in this._profiles) max = Math.max(max, this._profiles[profile].max);
        return max;
    }
    public getMinProfileKarma ():number {
        let min = 0;
        for (let profile in this._profiles) min = Math.min(min, this._profiles[profile].min);
        return min;
    }
    public useProfile (profile:string) {
        if (!(profile in this._profiles)) return false;
        this._karma = this._profiles[profile].min;
    }
}
