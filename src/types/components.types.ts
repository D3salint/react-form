export type RecordWithFields<T, V = unknown> = T & {
    [key: string]: V;
};

export type OptionalObject<T> = {
    [Key in keyof T]?: T[Key];
};

export type RequiredObject<T> = {
    [Key in keyof T]-?: T[Key];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ToAsync<T extends Function> = T extends (
    ...data: infer Props
) => infer Output
    ? (...data: Props) => Promise<Output>
    : T;

export type GetFunctionArgs<T> = T extends (...data: infer Props) => any
    ? Props
    : unknown;

export type RecordOptional<T, Value = void> = {
    [Key in keyof T]?: Value extends void ? T[Key] : Value;
};

export type DotNotation<T, Prefix extends string = ''> = T extends object
    ? {
          [K in keyof T]: K extends string
              ? T[K] extends object
                  ? DotNotation<T[K], `${Prefix}${K}.`> | `${Prefix}${K}`
                  : `${Prefix}${K}`
              : never;
      }[keyof T]
    : never;

export type DotizeObject<T, V = unknown> = {
    [K in keyof T as DotNotation<T>]: V;
};