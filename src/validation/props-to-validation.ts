import { RequiredObject } from '../types/components.types';
import {
    FormValidationEvents,
    FormsValidationOptions,
} from '../types/validation.type';

type ValidationOptions<Fields> = RequiredObject<
    Omit<FormsValidationOptions<Fields>, 'on'>
> & { on: FormValidationEvents };

export function propsToDefaultValidation<Fields>(
    props: FormsValidationOptions<Fields> = {
        on: {
            blur: false,
            change: false,
            submit: false,
        },
        schema: () => ({}),
    }
): ValidationOptions<Fields> {
    return {
        on: {
            blur: props.on === true || props.on.blur || false,
            change: props.on === true || props.on.change || false,
            submit: props.on === true || props.on.submit || false,
        },
        schema: props.schema,
        invalidScrollToEl: props.invalidScrollToEl || false,
    };
}
