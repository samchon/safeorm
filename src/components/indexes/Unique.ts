import { Belongs } from "..";
import { IColumn } from "../../structures/IColumn";
import { Creator } from "../../typings/Creator";
import { SpecialFields } from "../../typings/SpecialFields";

export function Unique<Target extends object>
    (
        target: Creator<Target>,
        field: SpecialFields<Target, IColumn.InvertType<any> | Belongs.ManyToOne<any, any> | Belongs.OneToOne<any, any>>
    ): void;

export function Unique<Target extends object>
    (
        target: Creator<Target>,
        fields: SpecialFields<Target, IColumn.InvertType<any> | Belongs.ManyToOne<any, any> | Belongs.OneToOne<any, any>>[]
    ): void;

export function Unique<Target extends object>
    (
        target: Creator<Target>,
        field: string | string[],
    ): void
{
}