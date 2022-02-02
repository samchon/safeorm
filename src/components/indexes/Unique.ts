import { Belongs } from "../relationships/Belongs";
import { IColumn } from "../../structures/IColumn";
import { Creator } from "../../typings/Creator";
import { SpecialFields } from "../../typings/SpecialFields";
import { Entity } from "../Entity";

export function Unique<Target extends object>
    (
        target: Creator<Entity.Enable<Target>>,
        field: SpecialFields<Target, IColumn.InvertType<any> | Belongs.ManyToOne<any, any> | Belongs.OneToOne<any, any>>
    ): void;

export function Unique<Target extends object>
    (
        target: Creator<Entity.Enable<Target>>,
        fields: SpecialFields<Target, IColumn.InvertType<any> | Belongs.ManyToOne<any, any> | Belongs.OneToOne<any, any>>[]
    ): void;

export function Unique<Target extends object>
    (
        target: Creator<Entity.Enable<Target>>,
        field: string | string[],
    ): void
{
}