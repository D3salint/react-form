import { OptionalObject } from './components.types';
import * as yup from 'yup';

export interface FormValidationEvents {
    submit: boolean;
    change: boolean;
    blur: boolean;
}

export interface FormsValidationOptions<Fields> {
    schema: yup.ObjectSchema<any> | ((data: Fields) => Record<string, string>);
    on:  true | OptionalObject<FormValidationEvents>;
    invalidScrollToEl?: boolean;
}
