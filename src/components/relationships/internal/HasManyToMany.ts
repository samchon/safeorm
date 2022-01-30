import { Belongs } from "../Belongs";
import { Table } from "../../Table";

export interface HasManyToMany<
        Target extends Table.Creator<any, any>,
        Router extends Table.Creator<any, any>>
{
    target(): Target;
    router(): Router;

    get(): Promise<Table.Instance<Target>[]>;
    set(value: Table.Instance<Target>[]): Promise<void>;
}

export function HasManyToMany<
        Target extends Table.Creator<any, any>,
        Router extends Table.Creator<any, any>>
    (
        target: () => Target,
        router: () => Router,
        target_inverse: (router: Table.Instance<Router>) => Belongs.ManyToOne<Table.Instance<Target>, any>,
        my_inverse: (router: Table.Instance<Router>) => Belongs.ManyToOne<any, any>,
        comparator?: (x: HasManyToMany.ITuple<Target, Router>, router: HasManyToMany.ITuple<Target, Router>) => number
    ): HasManyToMany.IProps<Target, Router>
{
    return {
        component: "Relationship",
        type: "Has.ManyToMany",
        target,
        router,
        target_inverse,
        my_inverse,
        comparator
    };
}

export namespace HasManyToMany
{
    export interface IProps<
            Target extends Table.Creator<any, any>,
            Router extends Table.Creator<any, any>>
    {
        component: "Relationship";
        type: "Has.ManyToMany";
        target: () => Target;
        router: () => Router;
        target_inverse: (router: Table.Instance<Router>) => Belongs.ManyToOne<Table.Instance<Target>, any>;
        my_inverse: (router: Table.Instance<Router>) => Belongs.ManyToOne<any, any>;
        comparator?: (x: ITuple<Target, Router>, y: ITuple<Target, Router>) => number;
    }

    export interface ITuple<
            Target extends Table.Creator<any, any>,
            Router extends Table.Creator<any, any>>
    {
        target: Table.Instance<Target>;
        router: Table.Instance<Router>;
    }
}