export type PromiseInvert<T extends Promise<any>> = T extends Promise<infer U> ? U : never;