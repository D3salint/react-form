import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface FormSubmit<Fields> {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    config?: AxiosRequestConfig<any> | (() => AxiosRequestConfig<any>);
    resetData?: boolean;
    transformData?: (data: Fields) => any;
    onError?: (error: AxiosError<any, any>) => void;
    onResponse?: <T = any>(serverData: AxiosResponse<T>) => void;
}

export type FormSubmitNative<Fields> = 
    (data: Fields, event: React.FormEvent<HTMLFormElement>) => void;