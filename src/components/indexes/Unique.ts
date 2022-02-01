import { Belongs } from "../relationships/Belongs";
import { IColumn } from "../../structures/IColumn";
import { Creator } from "../../typings/Creator";
import { SpecialFields } from "../../typings/SpecialFields";
import { Table } from "../Table";

export function Unique<Target extends object>
    (
        target: Creator<Table.Enable<Target>>,
        field: SpecialFields<Target, IColumn.InvertType<any> | Belongs.ManyToOne<any, any> | Belongs.OneToOne<any, any>>
    ): void;

export function Unique<Target extends object>
    (
        target: Creator<Table.Enable<Target>>,
        fields: SpecialFields<Target, IColumn.InvertType<any> | Belongs.ManyToOne<any, any> | Belongs.OneToOne<any, any>>[]
    ): void;

export function Unique<Target extends object>
    (
        target: Creator<Table.Enable<Target>>,
        field: string | string[],
    ): void
{
}