import { ColumnType } from "../typings/ColumnType";
import { IColumn } from "./IColumn";

export interface IPrimaryColumn<Type extends ColumnType> 
    extends Omit<IColumn<Type, false>, "component"|"primary"|"unique"|"index"|"nullable">,
        IPrimaryColumn.IBase<Type>
{
}
export namespace IPrimaryColumn
{
    export interface IBase<Type extends ColumnType>
    {
        component: "Column";
        type: Type;
        primary: true;
        nullable: false;
    }
}