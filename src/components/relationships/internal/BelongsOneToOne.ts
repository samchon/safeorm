import { CapsuleNullable } from "../../../typings/CapsuleNullable";
import { Creator } from "../../../typings/Creator";
import { RelationshipType } from "../../../typings/RelationshipType";

export interface BelongsOneToOne<
        Target extends object,
        Options extends BelongsOneToOne.IOptions<any>>
{
    readonly component: "Relationship";
    readonly type: "Belongs.OneToOne";
    readonly target: Creator.Getter<Target>;

    id: CapsuleNullable<RelationshipType.DeductPrimaryType<Target>, Options>;
    get(): Promise<CapsuleNullable<Target, Options>>;
    set(value: Promise<CapsuleNullable<Target, Options>>): Promise<void>;
}

export function BelongsOneToOne<
        Target extends object,
        Options extends BelongsOneToOne.IOptions<any>>
    (
        target: Creator.Getter<Target>,
        options?: Options
    ): BelongsOneToOne<Target, Options>
{
    return {} as any;
}

export namespace BelongsOneToOne
{
    export interface IOptions<Nullable extends true|false>
    {
        field?: string;
        name?: string;
        nullable?: Nullable;
        primary?: Nullable extends true ? never : boolean;
        unique?: boolean;
    }
}