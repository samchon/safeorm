import { Belongs } from "../Belongs";
import { Table } from "../../Table";
import { SpecialFields } from "../../../typings/SpecialFields";

export interface HasOneToMany<Target extends Table.Creator<any, any>>
{
    get(): Promise<Table.Instance<Target>[]>;
    set(value: Table.Instance<Target>[]): Promise<void>;
}

export function HasOneToMany<Target extends Table.Creator<any, any>>
    (
        target: () => Target,
        inverse: (target: Table.IProps<Target>) => Belongs.ManyToOne<any, any>,
        comparator?: (x: Table.Instance<Target>, y: Table.Instance<Target>) => number
    ): HasOneToMany.IProps<Target>
{
    return {
        component: "Relationship",
        type: "Has.OneToMany",
        target,
        inverse,
        comparator
    };
}

export namespace HasOneToMany
{
    export interface IProps<Target extends Table.Creator<any, any>>
    {
        component: "Relationship";
        type: "Has.OneToMany";
        target: () => Target;
        inverse: (target: Table.IProps<Target>) => Belongs.ManyToOne<any, any>;
        comparator?: (x: Table.Instance<Target>, y: Table.Instance<Target>) => number;
    }
}