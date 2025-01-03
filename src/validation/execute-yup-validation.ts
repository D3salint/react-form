import * as yup from 'yup';

export function executeYupValidation<Fields>(
    values: Fields,
    schema: yup.ObjectSchema<any>
) {
    const errors: Record<string, string> = {};
    try {
        schema.validateSync(values, { abortEarly: false });
    } catch (error) {
        const err = error as yup.ValidationError;
        for (const { path, message, value } of err.inner) {
            if (path && value !== '') {
                errors[path] = message;
            }
        }
    }
    return errors;
}