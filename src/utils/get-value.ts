import { DotNotation } from "../types/components.types";

export function getValue<T>(obj: T, key: DotNotation<T>) {
    const keys = (key as string).split('.');
    let value = obj;

    let lvl = 0;

    while(lvl < keys.length) {
        if(typeof value === 'undefined') {
            return undefined;
        }
        value = (value as any)[keys[lvl]];
        lvl++;
    }

    return value as any;
};