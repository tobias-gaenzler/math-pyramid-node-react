export class User {
    constructor(
        public id: string,
        private _name: string
    ) {
        this.id = id
        this._name = _name
    }
    public get name(): string {
        if (this._name) {
            return this._name
        } else {
            return this.id
        }
    }
    public set name(name: string) {
        this._name = name
    }
    
    toString(): string {
        return `Name: ${this.name}, ID: ${this.id}`
    }
}