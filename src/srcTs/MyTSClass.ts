export class MyTSClass {
    private _var1: string;
    private _var2: string;
    constructor(private var1: string, private var2: string) {

    };
    public get Var1(): string {
        return this._var1;
    };
    public get Var2(): string {
        return this._var2
    };

    public logStuff(): void {
        console.log('hi, you have reached log stuff!');
    };

    public logYourProp(yourProp: any): void {
        console.log(`hi, this is yours:${yourProp}`);
    };
}