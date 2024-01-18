export class User {
    constructor(
        public id: string,
        private _name: string
    ) { }
    public get name(): string {
        if (this._name) {
            return this._name;
        } else {
            return this.id;
        }
    }
    public set name(name: string) {
        this._name = name;
    }   

    public toString(): string {
        return `Name: ${this._name}, ID: ${this.id}`;
    }
}