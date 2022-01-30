import { Column } from "./Column";
import { ColumnType } from "../../typings/ColumnType";
import { OmitNever } from "../../typings/OmitNever";
import { IColumn } from "../../structures/IColumn";

export function CreateDateColumn<Type extends ColumnType.DateType>
    (type: Type): CreateDateColumn.IBaseColumn<Type>;
    
export function CreateDateColumn<
        Type extends ColumnType.DateType,
        Options extends CreateDateColumn.IOptions<Type>>
    (
        type: Type,
        options: Options
    ): Options & CreateDateColumn.IBaseColumn<Type>;

export function CreateDateColumn<
        Type extends ColumnType.DateType,
        Options extends CreateDateColumn.IOptions<Type>>
    (type: Type, options?: Options): Options & CreateDateColumn.IBaseColumn<Type>
{
    const base: CreateDateColumn.IBaseColumn<Type> =
    {
        component: "Column",
        symbol: "CreateDateColumn",
        type,
        nullable: false,
        default: () => new Date()
    };
    options = options || {} as Options;

    return { ...options, ...base };
}

export namespace CreateDateColumn
{
    export type IOptions<Type extends ColumnType.DateType>
        = OmitNever<Omit<Column.IOptions<Type, false>, "default">>;

    export interface IBaseColumn<Type extends ColumnType.DateType>
        extends IColumn.IBase<Type, false>
    {
        symbol: "CreateDateColumn";
        default: () => Date;
    }
}