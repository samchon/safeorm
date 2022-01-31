export type CapsuleNullable<T, Options extends object> 
    = Options extends { nullable: true }
        ? (T | null)
        : T;