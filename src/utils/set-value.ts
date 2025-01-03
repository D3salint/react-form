export function setValue(key: string, value: unknown, obj: any) {
    const keys = splitter(key);
    let current = obj;
    
    let lvl = 0;

    while(lvl < keys.length - 1) {
        if(typeof value === 'undefined') {
            return;
        }
        current = current[keys[lvl]];
        lvl++;
    }
    current[keys[lvl]] = value;
};

// arr[1].name
// arr 1 name

function splitter(val: string) {
    return val.split(/[\.\[\]]/).filter((item) => !!item)
}