const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Validators {
    static isNotEmpty(value: string, trim = false) {
        if (trim) {
            return value.trim() !== '';
        }
        return value !== '';
    }

    static isTrue(value: boolean) {
        return value === true;
    }

    static isFunction(value: unknown) {
        return typeof value === 'function';
    }

    static isValidEmail(value: string) {
        return Validators.isNotEmpty(value, true) && EMAIL_REGEX.test(value);
    }

    static isNumberMoreThan(value: number, point: number, equal = false) {
        if (equal) {
            return value >= point;
        }
        return value > point;
    }

    static isNumberLessThan(value: number, point: number, equal = false) {
        if (equal) {
            return value <= point;
        }
        return value < point;
    }

    static isNumberBetween(
        value: number,
        min: number,
        max: number,
        equal = false
    ) {
        return (
            Validators.isNumberLessThan(value, max, equal) &&
            Validators.isNumberMoreThan(value, min, equal)
        );
    }
}

export default Validators;
