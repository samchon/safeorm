import { IColumn } from "../../structures/IColumn";
import { ColumnType } from "../../typings/ColumnType";
import { OmitNever } from "../../typings/OmitNever";

export function Column<Type extends ColumnType>
    (type: Type): IColumn.InvertType<Column.IBaseOption<Type, false>>;

export function Column<
        Type extends ColumnType,
        Options extends Column.IOptions<Type, any>>
    (
        type: Type, 
        options: Options
    ): IColumn.InvertType<Column.IBaseOption<Type, any> & Options>;

export function Column<
        Type extends ColumnType, 
        Options extends Column.IOptions<Type, any>>
    (type: Type, options?: Options): any
{
    options = (options || {}) as Options;
    return {
        __metadata: {
            ...options,
            component: "Column",
            type,
        }
    };
}

export namespace Column
{
    export type IOptions<
            Type extends ColumnType,
            Nullable extends true|false> 
        = OmitNever<Omit<IColumn<Type, Nullable>, "component"|"type">>;

    export interface IBaseOption<
            Type extends ColumnType,
            Nullable extends true|false>
    {
        component: "Column";
        type: Type;
        nullable?: Nullable;
    }
}