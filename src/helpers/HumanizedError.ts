export class HumanizedError extends Error {
    
    private _innerError? : Error;

    public get innerError() : Error {
        return this._innerError;
    }

    
    private _alsoPrintInnerError : boolean;
    public get alsoPrintInnerError() : boolean {
        return this._alsoPrintInnerError;
    }

    public print() : void {
        console.error(this.message);
        if (this.innerError && this.alsoPrintInnerError) {
            console.error(this.innerError.message);
            // print stack trace
            console.error(this.innerError.stack);
        }
    }
   
    
    
    constructor(message: string, innerError?: Error, alsoPrintInnerError?: boolean) {
        super(message);
        this.name = 'HumanizedError';
        this._innerError = innerError;
        this._alsoPrintInnerError = alsoPrintInnerError;
    }
}