import { IColumn } from "../../structures/IColumn";
import { ColumnType } from "../../typings/ColumnType";
import { OmitNever } from "../../typings/OmitNever";
import { Column } from "./Column";

export function DeleteDateColumn<Type extends ColumnType.DateType>
    (type: Type): IColumn.InvertType<DeleteDateColumn.IBaseColumn<Type>>;

export function DeleteDateColumn<
        Type extends ColumnType.DateType,
        Options extends DeleteDateColumn.IOptions<Type>>
    (
        type: Type,
        options: Options
    ): IColumn.InvertType<Options & DeleteDateColumn.IBaseColumn<Type>>;

export function DeleteDateColumn<
        Type extends ColumnType.DateType,
        Options extends DeleteDateColumn.IOptions<Type>>
    (
        type: Type, 
        options?: Options
    ): any
{
    const base: DeleteDateColumn.IBaseColumn<Type> = {
        component: "Column",
        symbol: "DeleteDateColumn",
        type,
        nullable: true as const,
        default: () => null
    };
    options = options || {} as Options;

    return { 
        __metadata: { ...options, ...base }
    };
}

export namespace DeleteDateColumn
{
    export type IOptions<Type extends ColumnType.DateType>
        = OmitNever<Omit<Column.IOptions<Type, true>, "default">>;

    export interface IBaseColumn<Type extends ColumnType.DateType>
        extends IColumn.IBase<Type, true>
    {
        symbol: "DeleteDateColumn";
        default: () => null;
    }
}