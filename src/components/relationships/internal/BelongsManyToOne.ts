import { CapsuleNullable } from "../../../typings/CapsuleNullable";
import { RelationshipType } from "../../../typings/RelationshipType";
import { Table } from "../../Table";

export interface BelongsManyToOne<
        Target extends Table.Creator<Table<any>, any>,
        Nullable extends true|false>
{
    id: CapsuleNullable<RelationshipType.DeductPrimaryType<Target>, Nullable>;
    get(): Promise<CapsuleNullable<Table.Instance<Target>, Nullable>>;
    set(value: Promise<CapsuleNullable<Table.Instance<Target>, Nullable>>): Promise<void>;
}

export function BelongsManyToOne<
        Target extends Table.Creator<Table<any>, any>,
        Nullable extends true|false>
    (
        target: () => Target,
        nullable: Nullable,
        options?: BelongsManyToOne.IOptions
    ): BelongsManyToOne.IProps<Target, Nullable>
{
    options = options || {};
    return {
        ...options,
        component: "Relationship",
        type: "Belongs.ManyToOne",
        target,
        nullable
    };
}

export namespace BelongsManyToOne
{
    export interface IOptions
    {
        field?: string;
        name?: string;
        index?: boolean;
    }

    export interface IProps<
            Target extends Table.Creator<Table<any>, any>,
            Nullable extends true|false>
        extends IOptions
    {
        component: "Relationship";
        type: "Belongs.ManyToOne";
        target: () => Target;
        nullable: Nullable;

        field?: string;
        name?: string;
        index?: boolean;
    }
}