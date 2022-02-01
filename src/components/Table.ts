import { IColumn } from "../structures/IColumn";
import { IPrimaryColumn } from "../structures/IPrimaryColumn";
import { Creator } from "../typings/Creator";
import { SpecialFields } from "../typings/SpecialFields";

export function Table<T extends object>
    (target: Creator<Table.Enable<T>>): void
{   
}
export namespace Table
{
    export type Enable<T extends object> 
        = SpecialFields<T, { __metadata?: IPrimaryColumn<any> }> extends never
            ? never
            : T;
}