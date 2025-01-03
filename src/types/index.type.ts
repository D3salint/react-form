import { DotizeObject } from './components.types';
import { FormSubmit, FormSubmitNative } from './submit.type';
import { FormsValidationOptions } from './validation.type';

export type FormProps<Fields> = {
    initialValues: Fields;
    initialTouched?: DotizeObject<Fields, boolean>;
    initialErrors?: DotizeObject<Fields, string>;
    validation?: FormsValidationOptions<Fields>;
    submit?: FormSubmit<Fields> | FormSubmitNative<Fields>;
};

export type FormState<Fields> = {
    values: Fields;
    errors: DotizeObject<Fields, string>;
    touched: DotizeObject<Fields, boolean>;
    isSubmitting: boolean;
    isSubmitted: boolean;
};