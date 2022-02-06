import { v4 } from "uuid";

import { ColumnType } from "../../typings/ColumnType";
import { IColumn } from "../../structures/IColumn";
import { IPrimaryGeneratedColumn } from "../../structures/IPrimaryGeneratedColumn";
import { PrimaryColumn } from "./PrimaryColumn";

import { DEFAULT } from "../DEFAULT";

export function PrimaryGeneratedColumn<Type extends ColumnType.Generatable>
    (type: Type): IColumn.InvertType<IPrimaryGeneratedColumn.IBase<Type>>;

export function PrimaryGeneratedColumn<
        Type extends ColumnType.Generatable,
        Options extends PrimaryGeneratedColumn.IOptions<Type>>
    (
        type: Type, 
        options: Options
    ): IColumn.InvertType<IPrimaryGeneratedColumn.IBase<Type> & Options>;

export function PrimaryGeneratedColumn<Type extends ColumnType.Generatable>
    (
        type: Type, 
        options?: any
    )
{
    return PrimaryColumn(type, 
    {
        ...(options || {}),
        default: (type === "uuid"
            ? () => v4() 
            : () => DEFAULT as any),
    });
}
export module PrimaryGeneratedColumn
{
    export type IOptions<Type extends ColumnType.Generatable> 
        = Partial<Omit<IColumn<Type, false>, "component"|"primary"|"unique"|"index"|"default">>;
}