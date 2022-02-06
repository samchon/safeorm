import { ColumnType } from "../typings/ColumnType";
import { IColumn } from "./IColumn";

export interface IPrimaryGenetedColumn<Type extends ColumnType.Generatable>
    extends Omit<IColumn<Type, false>, "component"|"primary"|"unique"|"index"|"nullable"|"default">,
        IPrimaryGeneratedColumn.IBase<Type>
{

}
export module IPrimaryGeneratedColumn
{
    export interface IBase<Type extends ColumnType.Generatable>
    {
        component: "Column";
        type: Type;
        primary: true,
        nullable: false;
        default: () => ColumnType.InvertType<Type>;
    }
}