export function deepClone<T extends object>(input: T):T {
    const obj: any = Array.isArray(input) 
        ? []
        : {};

    for(const [name, value] of Object.entries(input)) {
        obj[name] = (typeof value === 'object' && value !== null)
            ? deepClone(value)
            : value;
    }

    return obj;
};