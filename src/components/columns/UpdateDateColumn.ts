import { Column } from "./Column";
import { ColumnType } from "../../typings/ColumnType";
import { OmitNever } from "../../typings/OmitNever";
import { IColumn } from "../../structures/IColumn";

export function UpdateDateColumn<Type extends ColumnType.DateType>
    (type: Type): IColumn.InvertType<UpdateDateColumn.IBaseColumn<Type>>;
    
export function UpdateDateColumn<
        Type extends ColumnType.DateType,
        Options extends UpdateDateColumn.IOptions<Type>>
    (
        type: Type,
        options: Options
    ): IColumn.InvertType<Options & UpdateDateColumn.IBaseColumn<Type>>;

export function UpdateDateColumn<
        Type extends ColumnType.DateType,
        Options extends UpdateDateColumn.IOptions<Type>>
    (
        type: Type, 
        options?: Options
    ): any
{
    const base: UpdateDateColumn.IBaseColumn<Type> = {
        component: "Column",
        symbol: "UpdateDateColumn",
        type,
        nullable: false,
        default: () => new Date(),
    };
    options = options || {} as Options;
    
    return { 
        __metadata: { ...options, ...base }
    };
}

export module UpdateDateColumn
{
    export type IOptions<Type extends ColumnType.DateType>
        = OmitNever<Omit<Column.IOptions<Type, false>, "default">>;

    export interface IBaseColumn<Type extends ColumnType.DateType>
        extends IColumn.IBase<Type, false>
    {
        symbol: "UpdateDateColumn";
        default: () => Date;
    }
}