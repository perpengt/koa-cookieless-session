interface SessionMethods {
    toJSON(): object;
}
declare class Session {
    sessID: string;
    private _removed;
    readonly removed: boolean;
    constructor(sessID: string);
    toJSON(): {
        [key: string]: any;
    };
    remove(): void;
}
declare interface Session extends SessionMethods {
    [key: string]: any;
}
export default Session;
