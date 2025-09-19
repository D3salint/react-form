"use client";

import React, { useMemo } from "react";
import axios from "axios";
import useFormsCore from "./useFormsCore";
import { FormProps, FormStatus } from "../types/index.type";
import { scrollToError, setValue } from "../utils";
import { getValidation, propsToDefaultValidation } from "../validation";
import { DotNotation } from "../types/components.types";

function useForms<Fields>(props: FormProps<Fields>) {
    const core = useFormsCore<Fields>(props);

    const validationOptions = useMemo(() => propsToDefaultValidation(props.validation), [props.validation]);

    const updateValue = (key: DotNotation<Fields>, value: unknown) => {
        setValue(key, value, core.state.values);
    };

    const setFields: typeof core.setFields = (fields, shouldValidate) => {
        core.setFields(fields);
        if(shouldValidate) {
            const errors = getValidation(validationOptions.schema, core.state.values);
            core.setErrors(errors)
        }
        core.rerender();
    };

    const setTouched: typeof core.setTouched = (values) => {
        core.setTouched(values);
        core.rerender();
    };

    const setErrors: typeof core.setErrors = (errors) => {
        core.setErrors(errors);
        core.rerender();
    };

    const setFieldValue = (key: DotNotation<Fields>, value: unknown, shouldValidate?: boolean) => {
        updateValue(key, value);

        if (shouldValidate) {
            const errors = getValidation(validationOptions.schema, core.state.values);
            core.setErrors({...core.state.errors, [key]: errors[key] });
        }

        core.rerender();
    };

    const setTouchedValue = (key: DotNotation<Fields>, value: boolean) => {
        setTouched({ [key]: value } as any);
    };

    const setErrorValue = (key: DotNotation<Fields>, value: boolean | string) => {
        core.setErrors({ [key]: value } as any);
        core.rerender();
    };

    const resetForm = () => {
        core.resetState();
        core.rerender();
    };

    const validate = (options?: { scrollToInputs?: boolean; touchAll?: boolean }) => {
        const errors = getValidation(validationOptions.schema, core.state.values);

        if (options?.touchAll) {
            for (const name of Object.keys(errors)) {
                core.setTouched({ [name]: true } as any);
            }
        }

        if (options?.scrollToInputs) {
            scrollToError(errors);
        }

        core.clearErrors();
        core.setErrors(errors);
        core.rerender();

        return errors;
    };

    const validateFields = (
        keys: DotNotation<Fields>[],
        options?: {
            touch?: boolean;
        }
    ) => {
        const errors = getValidation(validationOptions.schema, core.state.values);
        const setupErrors: Record<string,string> = {};

        for(const key of keys) {
            setupErrors[key] = errors[key];
        }

        if(options) {
            if(options.touch) {
                for(const key of keys) {
                    core.setTouched({ [key]: true } as any);
                }
            }
        }
        
        core.setErrors(setupErrors);
        core.rerender();

        return setupErrors;
    };

    const handleChange = (ev: React.ChangeEvent) => {
        const target = ev.target as HTMLInputElement;
        const { name, value } = target;
        setFieldValue(name as any, value, false);
        if (validationOptions.on.change) {
            validate();
        }
    };

    const handleBlur = (ev: React.FocusEvent) => {
        const target = ev.target as HTMLInputElement;
        const name = target.name;
        setTouchedValue(name as any, true);
        if (validationOptions.on.blur) {
            validate();
        }
    };

    const setStatus = (status: FormStatus) => {
        core.setStatus(status);
        core.rerender();
    };

    const isValidField = (key: DotNotation<Fields>) => {
        const isTouched = core.state.touched[key as keyof typeof core.state.touched];
        const hasError = core.state.errors[key as keyof typeof core.state.errors]
        return isTouched && !hasError;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { submit } = props;

        if (validationOptions.on.submit) {
            const errors = validate({
                scrollToInputs: validationOptions.invalidScrollToEl,
                touchAll: true,
            });
            if (Object.keys(errors).length > 0) {
                core.setSubmitted(true);
                core.rerender();
                return;
            }
        }

        if (typeof submit === "function") {
            return submit(core.state.values, event);
        }

        if (!submit) {
            return;
        }

        const { endpoint, config, method = "POST", resetData, onError, onResponse, transformData } = submit;

        try {
            core.setStatus(FormStatus.PENDING)
            core.setSubmitting(true);
            core.rerender();

            const axiosConfig = typeof config === "function" ? config() : typeof config === "object" ? config : {};

            const data = transformData ? transformData(core.state.values) : core.state.values;
            const response = await axios({
                ...axiosConfig,
                url: endpoint,
                method,
                data,
            });
            onResponse?.(response);
            core.setStatus(FormStatus.SUCCESS)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                onError?.(error);
            }
            core.setStatus(FormStatus.ERROR)
        } finally {
            if (resetData) {
                core.resetState();
            }
            core.setSubmitted(true);
            core.setSubmitting(false);
            core.rerender();
        }
    };

    const getError = (field: DotNotation<Fields>, touched?: boolean) => {
        const err = core.state.errors[field as keyof typeof core.state.errors] as string | undefined;
        if (touched && !core.state.touched[field as keyof typeof core.state.touched]) {
            return;
        }
        return err;
    };

    return {
        ...core.state,
        validateFields,
        validate,
        handleChange,
        handleBlur,
        handleSubmit,
        setErrorValue,
        setFieldValue,
        setTouchedValue,
        setTouched,
        setFields,
        setErrors,
        resetForm,
        getError,
        setStatus,
        isValidField
    };
}

export default useForms;
