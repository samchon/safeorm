import { ColumnType } from "../../typings/ColumnType";
import { IColumn } from "../../structures/IColumn";
import { IPrimaryColumn } from "../../structures/IPrimaryColumn";
import { Column } from "./Column";
import { OmitNever } from "../../typings/OmitNever";

export function PrimaryColumn<Type extends ColumnType>
    (type: Type): IPrimaryColumn.IBase<Type>;

export function PrimaryColumn<Type extends ColumnType, Options extends PrimaryColumn.IOptions<Type>>
    (
        type: Type, 
        options: Options
    ): IPrimaryColumn.IBase<Type> & Options;

export function PrimaryColumn<Type extends ColumnType>
    (
        type: Type, 
        options?: any
    )
{
    return Column(type, false,
    {
        ...(options || {}),
        primary: true,
        nullable: false,
    });
}
export namespace PrimaryColumn
{
    export type IOptions<Type extends ColumnType> 
        = OmitNever<Omit<Column.IOptions<Type, false>, "component"|"nullable"|"primary"|"unique"|"index">>;
}
