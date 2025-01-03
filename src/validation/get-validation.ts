import { FormsValidationOptions } from "../types/validation.type";
import { executeYupValidation } from "./execute-yup-validation";

export function getValidation(
    schema: FormsValidationOptions<any>['schema'],
    values: any
) {
    if(typeof schema === 'object') {
        return executeYupValidation(values, schema);
    }
    return {};
};