namespace Game.Canvas
{
    export class Layers {
        public items : any[] = [
            {
                document : Element,
                root : false
            }
        ];
        private current : number;

        public next () {}
        public prev () {}
        public count ():number {
            return this.items.length;
        }
        public pop () {

        }
        public push () {

        }
        public exists (index:number) {
            return (typeof this.items[index] !== "undefined");
        }
        public remove (index:number):boolean {
            if (typeof this.items[index] === "undefined") return false;
            if (this.current === index) this.next();
            this.items.splice(index, 1);
            return true;
        }
        public setRoot (index:number) {
            if (this.exists(index)) {
                this.current = index;
                return false;
            }
            return false;
        }

        public goTo ( index: number) {

        }

    }
}
