import { ColumnType } from ".";
import { Belongs } from "..";
import { IColumn } from "../structures/IColumn";
import { CapsuleNullable } from "./CapsuleNullable";
import { OmitNever } from "./OmitNever";

export type Initialized<T extends object> = OmitNever<
{
    [P in keyof T]
        : T[P] extends { __metadata?: IColumn<infer Type, any> }
            ? ColumnType.InvertType<Type>
        : T[P] extends (null | { __metadata?: IColumn<infer Type, any> })
            ? ColumnType.InvertType<Type> | null
        : T[P] extends Belongs.ManyToOne<infer Target, infer Options>
            ? CapsuleNullable<Target, Options>
        : T[P] extends Belongs.OneToOne<infer Target, infer Options>
            ? CapsuleNullable<Target, Options>
        : never;
}>;