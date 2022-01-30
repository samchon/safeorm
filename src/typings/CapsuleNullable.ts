export type CapsuleNullable<T, Nullable extends true|false> 
    = Nullable extends true
        ? (T | null)
        : T;
    
export namespace CapsuleNullable
{
    export type Invert<T, Ensure extends true|false>
        = Ensure extends true
            ? T
            : (T | null);
}