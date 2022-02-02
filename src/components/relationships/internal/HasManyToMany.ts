import { Creator } from "../../../typings/Creator";
import { Belongs } from "../Belongs";

export interface HasManyToMany<
        Target extends object,
        Router extends object>
{
    readonly component: "Relationship";
    readonly type: "Has.ManyToMany";
    readonly target: Creator.Getter<Target>;
    readonly router: Creator.Getter<Router>;

    get(): Promise<Target>[];
    set(value: Target[]): Promise<void>;
}

export function HasManyToMany<
        Target extends object,
        Router extends object>
    (
        target: Creator.Getter<Target>,
        router: Creator.Getter<Router>,
        target_inverse: (router: Router) => Belongs.ManyToOne<Target, any>,
        my_inverse: (router: Router) => Belongs.ManyToOne<any, any>,
        comparator?: (x: HasManyToMany.ITuple<Target, Router>, router: HasManyToMany.ITuple<Target, Router>) => number
    ): HasManyToMany<Target, Router>
{
    return {} as any;
}

export namespace HasManyToMany
{
    export interface ITuple<
            Target extends object,
            Router extends object>
    {
        target: Target;
        router: Router;
    }
}