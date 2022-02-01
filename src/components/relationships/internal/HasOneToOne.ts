import { Belongs } from "../Belongs";
import { CapsuleNullable } from "../../../typings/CapsuleNullable";
import { Creator } from "../../../typings/Creator";

export interface HasOneToOne<
        Target extends object, 
        Options extends HasOneToOne.IOptions<any>>
{
    readonly component: "Relationship";
    readonly type: "Has.OneToOne";
    readonly target: Creator.Getter<Target>;

    get(): Promise<CapsuleNullable<Target, Options>>;
    set(value: CapsuleNullable<Target, Options>): Promise<void>;
}

export function HasOneToOne<
        Target extends object, 
        Options extends HasOneToOne.IOptions<any>>
    (
        target: Creator.Getter<Target>,
        inverse: (target: Target) => Belongs.OneToOne<any, any>,
        options?: Options
    ): HasOneToOne<Target, Options>
{
    return {} as any;
}

export namespace HasOneToOne
{
    export interface IOptions<Nullable extends true|false>
    {
        nullable?: Nullable;
    }
}