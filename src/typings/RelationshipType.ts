import { Has } from "../components/relationships/Has";
import { Belongs } from "../components/relationships/Belongs";
import { SpecialFields } from "./SpecialFields";
import { ColumnType } from "./ColumnType";
import { IColumn } from "../structures/IColumn";
import { IPrimaryColumn } from "../structures/IPrimaryColumn";

export type RelationshipType<Target extends object>
    = Belongs.ManyToOne<Target, any>
    | Belongs.OneToOne<Target, any>
    | Has.OneToOne<Target, any>
    | Has.OneToMany<Target>
    | Has.ManyToMany<Target, any>;

export namespace RelationshipType
{
    export type DeductPrimaryType<Target extends object>
        = Target[SpecialFields<Target, IColumn.InvertType<IPrimaryColumn<any>>>] extends IColumn.InvertType<IPrimaryColumn<infer Type>>
            ? ColumnType.InvertType<Type>
            : never;
}