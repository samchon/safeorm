import { IColumn } from "../../structures/IColumn";
import { ColumnType } from "../../typings/ColumnType";
import { OmitNever } from "../../typings/OmitNever";

export function Column<Type extends ColumnType, Nullable extends true|false>
    (type: Type, nullable: Nullable): Column.IBaseOption<Type, Nullable>;

export function Column<
        Type extends ColumnType,
        Nullable extends true|false,
        Options extends Column.IOptions<Type, Nullable>>
    (
        type: Type, 
        nullable: Nullable, 
        options: Options
    ): Column.IBaseOption<Type, Nullable> & Options;

export function Column<
        Type extends ColumnType, 
        Nullable extends true|false,
        Options extends Column.IOptions<Type, Nullable>>
    (type: Type, nullable: Nullable, options?: Options)
{
    options = (options || {}) as Options;
    return {
        ...options,
        component: "Column",
        type,
        nullable,
    };
}

export namespace Column
{
    export type IOptions<
            Type extends ColumnType,
            Nullable extends true|false> 
        = OmitNever<Omit<IColumn<Type, Nullable>, "component"|"type"|"nullable">>;

    export interface IBaseOption<
            Type extends ColumnType,
            Nullable extends true|false>
    {
        component: "Column";
        type: Type;
        nullable: Nullable;
    }
}