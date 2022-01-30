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

export namespace IColumn
{
    export type InvertType<Props extends IColumn<any, any>> 
        = Props extends IColumn<infer Type, infer Nullable>
            ? CapsuleNullable<ColumnType.InvertType<Type>, Nullable>
            : never;

    export interface IBase<
            Type extends ColumnType,
            Nullable extends true|false>
    {
        component: "Column";
        type: Type;
        nullable: Nullable;
    }
}