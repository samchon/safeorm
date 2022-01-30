import { Belongs } from "../Belongs";
import { CapsuleNullable } from "../../../typings/CapsuleNullable";
import { Table } from "../../Table";

export interface HasOneToOne<
        Target extends Table.Creator<any, any>, 
        Nullable extends true|false>
{
    get(): Promise<CapsuleNullable<Table.Instance<Target>, Nullable>>;
    set(value: CapsuleNullable<Table.Instance<Target>, Nullable>): Promise<void>;
}

export function HasOneToOne<
        Target extends Table.Creator<any, any>, 
        Nullable extends true|false>
    (
        target: () => Target,
        inverse: (target: Table.Instance<Target>) => Belongs.OneToOne<any, any>,
        nullable: Nullable
    ): HasOneToOne.IProps<Target, Nullable>
{
    return {
        component: "Relationship",
        type: "Has.OneToOne",
        target,
        inverse,
        nullable
    };
}

export namespace HasOneToOne
{
    export interface IProps<
            Target extends Table.Creator<any, any>,
            Nullable extends true|false>
    {
        component: "Relationship";
        type: "Has.OneToOne";
        target: () => Target;
        inverse: (target: Table.Instance<Target>) => Belongs.OneToOne<any, any>;
        nullable: Nullable;
    }
}