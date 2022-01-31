import { CapsuleNullable } from "../../../typings/CapsuleNullable";
import { Creator } from "../../../typings/Creator";
import { RelationshipType } from "../../../typings/RelationshipType";

export interface BelongsManyToOne<
        Target extends object,
        Options extends BelongsManyToOne.IOptions<any>>
{
    readonly component: "Relationship";
    readonly type: "Belongs.ManyToOne";
    readonly target: Creator.Getter<Target>;

    id: CapsuleNullable<RelationshipType.DeductPrimaryType<Target>, Options>;
    get(): Promise<CapsuleNullable<Target, Options>>;
    set(value: Promise<CapsuleNullable<Target, Options>>): Promise<void>;
}

export function BelongsManyToOne<
        Target extends object,
        Options extends BelongsManyToOne.IOptions<any>>
    (
        target: Creator.Getter<Target>,
        options?: Options
    ): BelongsManyToOne<Target, Options>
{
    return {} as any;
}

export namespace BelongsManyToOne
{
    export interface IOptions<Nullable extends true|false>
    {
        field?: string;
        name?: string;
        index?: boolean;
        nullable?: Nullable;
    }
}