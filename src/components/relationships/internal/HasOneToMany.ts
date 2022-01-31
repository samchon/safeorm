import { Creator } from "../../../typings/Creator";
import { Belongs } from "../Belongs";

export interface HasOneToMany<Target extends object>
{
    readonly component: "Relationship";
    readonly type: "Has.OneToMany";

    get(): Promise<Target[]>;
    set(value: Target[]): Promise<void>;
}

export function HasOneToMany<Target extends object>
    (
        target: Creator.Getter<Target>,
        inverse: (target: Target) => Belongs.ManyToOne<any, any>,
        comparator?: (x: Target, y: Target) => number
    ): HasOneToMany<Target>
{
    return {} as any;
}

export namespace HasOneToMany
{
}