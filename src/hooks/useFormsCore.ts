"use client";

import React from 'react';
import { deepClone } from '../utils/deep-clone';
import { OptionalObject, RecordOptional } from '../types/components.types';
import { FormProps, FormState } from '../types/index.type';
import {
    type ActionType,
    FormReducerActionEnum,
    formReducer,
} from '../reducer';

interface FormsCoreOutput<Fields> {
    state: FormState<Fields>;
    clearErrors: () => void;
    setErrors: (errors: RecordOptional<Fields, any>) => void;
    setFields: (values: OptionalObject<Fields>) => void;
    setTouched: (values: RecordOptional<Fields, boolean>) => void;
    setSubmitted: (value: boolean) => void;
    setSubmitting: (value: boolean) => void;
    rerender: () => void;
    resetState: () => void;
    dispatch: (action: ActionType) => boolean;
}

function useFormsCore<Fields>(
    props: FormProps<Fields>
): FormsCoreOutput<Fields> {
    const initialData = React.useRef<FormState<Fields>>({
        values: props.initialValues,
        errors: props.initialErrors || ({} as any),
        touched: props.initialTouched || ({} as any),
        isSubmitting: false,
        isSubmitted: false,
    });

    const stateRef = React.useRef(deepClone(initialData.current));

    const [, setRerenderCount] = React.useState(0);

    const rerender = React.useCallback(
        () => setRerenderCount((rerenderCount) => rerenderCount + 1),
        []
    );

    const dispatch = React.useCallback((action: ActionType) => {
        const state = formReducer(stateRef.current, action);
        if (state !== stateRef.current) {
            stateRef.current = state;
            return true;
        }
        return false;
    }, []);

    const setFields = (values: OptionalObject<Fields>) => {
        dispatch({
            type: FormReducerActionEnum.SET_FIELD,
            payload: values,
        });
    };

    const setErrors = (errors: RecordOptional<Fields, any>) => {
        dispatch({
            type: FormReducerActionEnum.SET_ERROR,
            payload: errors,
        });
    };

    const setSubmitting = (value: boolean) => {
        dispatch({
            type: FormReducerActionEnum.SET_SUBMITTION,
            payload: value,
        });
    };

    const setSubmitted = (value: boolean) => {
        dispatch({
            type: FormReducerActionEnum.SET_SUBMITTED,
            payload: value,
        });
    };

    const setTouched = (values: RecordOptional<Fields, boolean>) => {
        dispatch({
            type: FormReducerActionEnum.SET_TOUCHED,
            payload: values,
        });
    };

    const resetState = () => {
        dispatch({
            type: FormReducerActionEnum.RESET_STATE,
            payload: deepClone(initialData.current),
        });
    };

    const clearErrors = () => {
        dispatch({
            type: FormReducerActionEnum.CLEAR_ERRORS,
            payload: {}
        });
    };

    const state = stateRef.current;

    return {
        state,
        dispatch,
        setErrors,
        setFields,
        setSubmitting,
        setSubmitted,
        setTouched,
        resetState,
        rerender,
        clearErrors
    } as const;
}

export default useFormsCore;
