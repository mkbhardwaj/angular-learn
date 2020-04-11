
export class User {
    public redirect:boolean;
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {
    }
    // getter method
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        } else {
            return this._token;
        }
    }
}