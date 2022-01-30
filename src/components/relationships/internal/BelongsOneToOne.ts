import { CapsuleNullable } from "../../../typings/CapsuleNullable";
import { RelationshipType } from "../../../typings/RelationshipType";
import { Table } from "../../Table";

export interface BelongsOneToOne<
        Target extends Table.Creator<any, any>,
        Nullable extends true|false>
{
    id: CapsuleNullable<RelationshipType.DeductPrimaryType<Target>, Nullable>;
    get(): Promise<CapsuleNullable<Table.Instance<Target>, Nullable>>;
    set(value: Promise<CapsuleNullable<Table.Instance<Target>, Nullable>>): Promise<void>;
}

export function BelongsOneToOne<
        Target extends Table.Creator<any, any>,
        Nullable extends true|false>
    (
        target: () => Target,
        nullable: Nullable,
        options?: BelongsOneToOne.IOptions<Nullable>
    ): BelongsOneToOne.IProps<Target, Nullable>
{
    options = options || {};
    return {
        ...options,
        component: "Relationship",
        type: "Belongs.OneToOne",
        target,
        nullable,
    };
}

export namespace BelongsOneToOne
{
    export interface IOptions<Nullable extends true|false>
    {
        field?: string;
        name?: string;
        primary?: Nullable extends true ? never : boolean;
        unique?: boolean;
    }

    export interface IProps<
            Target extends Table.Creator<any, any>,
            Nullable extends true|false>
        extends IOptions<Nullable>
    {
        component: "Relationship";
        type: "Belongs.OneToOne";
        target: () => Target;
        nullable: Nullable;
    }
}