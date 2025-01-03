export function filterValidation(
    current: Record<string, string>,
    newErrors: Record<string, string>,
    checkFields: string[],
    skipEmpty?: boolean
) {
    const allowed = checkFields.length > 0 ? checkFields : Object.keys(newErrors);
    const filtered: Record<string,string> = {};

    for(const [key, value] of Object.entries(newErrors)) {
         if(!allowed.includes(key)) {
             continue;
         }
         if(skipEmpty && value.trim() === "") {
             continue;
         }
         filtered[key] = value;
     }

    return filtered;
}
