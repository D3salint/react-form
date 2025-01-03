import { FormState } from "../types/index.type";

export enum FormReducerActionEnum {
    SET_FIELD = 'SET_FIELD',
    SET_ERROR = 'SET_ERROR',
    CLEAR_ERRORS = 'CLEAR_ERRORS',
    SET_SUBMITTION = 'SET_SUBMITTING',
    SET_SUBMITTED = 'SET_SUBMITTED',
    SET_TOUCHED = 'SET_TOUCHED',
    RESET_STATE = 'RESET_STATE'
}

export type ActionType = {
    type: FormReducerActionEnum;
    payload: any;
};

export function formReducer<Fields>(
    state: FormState<Fields>,
    action: ActionType
): FormState<Fields> {
    switch (action.type) {
        case FormReducerActionEnum.SET_FIELD:
            return { ...state, values: { ...state.values, ...action.payload } };
        case FormReducerActionEnum.SET_SUBMITTION:
            return { ...state, isSubmitting: action.payload };
        case FormReducerActionEnum.CLEAR_ERRORS:
            return { ...state, errors: {} as any };
        case FormReducerActionEnum.SET_SUBMITTED:
            return { ...state, isSubmitted: action.payload };
        case FormReducerActionEnum.SET_ERROR:
            return { ...state, errors: { ...state.errors, ...action.payload } };
        case FormReducerActionEnum.SET_TOUCHED:
            return { ...state, touched: { ...state.touched, ...action.payload } };
        case FormReducerActionEnum.RESET_STATE:
            return { ...action.payload };
        default:
            return state;
    }
}