import { IColumn } from "../structures/IColumn";
import { IPrimaryColumn } from "../structures/IPrimaryColumn";
import { Creator } from "../typings/Creator";
import { SpecialFields } from "../typings/SpecialFields";

export function Entity<T extends object>
    (target: Creator<Entity.Enable<T>>): void
{   
}
export namespace Entity
{
    export type Enable<T extends object> 
        = SpecialFields<T, { __metadata?: IPrimaryColumn<any> }> extends never
            ? never
            : T;
}