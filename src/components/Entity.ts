import { ColumnType } from "../typings/ColumnType";
import { IColumn } from "../structures/IColumn";
import { IPrimaryColumn } from "../structures/IPrimaryColumn";
import { Creator } from "../typings/Creator";
import { OmitNever } from "../typings/OmitNever";
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

    export type Primitive<T extends object> = OmitNever<
    {
        [P in keyof T]
            : T[P] extends { __metadata?: infer Metadata }
                ? Metadata extends IColumn<infer Type, any>
                    ? ColumnType.InvertType<Type> extends Date
                        ? string
                        : ColumnType.InvertType<Type>
                    : never
            : T[P] extends { __metadata?: infer Metadata } | null
                ? Metadata extends IColumn<infer Type, any>
                    ? ColumnType.InvertType<Type> extends Date
                        ? string | null
                        : ColumnType.InvertType<Type> | null
                    : never
            : never;
    }>;
}