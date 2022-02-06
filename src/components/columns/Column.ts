import { IColumn } from "../../structures/IColumn";
import { ColumnType } from "../../typings/ColumnType";
import { OmitNever } from "../../typings/OmitNever";

export function Column<
        Type extends ColumnType, 
        Nullable extends boolean,
        Options extends Column.IOptions<Type, Nullable>>
    (
        type: Type, 
        options?: Options
    ): IColumn.InvertType<Column.IBaseOption<Type, Nullable> & Options>
{
    options = (options || {}) as Options;
    return {
        __metadata: {
            ...options,
            component: "Column",
            type,
        }
    } as any;
}

export module Column
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