import { CapsuleNullable } from "../typings/CapsuleNullable";
import { ColumnType } from "../typings/ColumnType";

export type IColumn<
        Type extends ColumnType,
        Nullable extends true|false> = IColumn.IBase<Type, Nullable> &
{
    length?: Type extends ColumnType.Lengthable ? number : never;
    default?: Nullable extends true
        ? () => (ColumnType.InvertType<Type> | null)
        : () => ColumnType.InvertType<Type>;

    name?: string;
    primary?: boolean;
    unique?: boolean;
    index?: boolean;
};

export module IColumn
{
    export interface IBase<
            Type extends ColumnType,
            Nullable extends true|false = false>
    {
        component: "Column";
        type: Type;
        nullable?: Nullable;
    }
    
    export type InvertType<Metadata extends IBase<any, any>> 
        = Metadata extends IColumn<infer Type, any>
            ? CapsuleNullable<ColumnType.InvertType<Type> & { __metadata?: Metadata }, Metadata>
            : never;
}