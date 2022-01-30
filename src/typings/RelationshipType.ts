import { Has } from "../components/relationships/Has";
import { Belongs } from "../components/relationships/Belongs";
import { Table } from "../components/Table";
import { IColumn } from "../structures/IColumn";
import { SpecialFields } from "./SpecialFields";

export type RelationshipType<Target extends Table.Creator<any, any>>
    = Belongs.ManyToOne.IProps<Target, any>
    | Belongs.OneToOne.IProps<Target, any>
    | Has.OneToOne.IProps<Target, any>
    | Has.OneToMany.IProps<Target>
    | Has.ManyToMany.IProps<Target, any>;

export namespace RelationshipType
{
    export type DeductPrimaryType<Creator extends Table.Creator<any, any>>
        = Creator extends Table.Creator<any, infer Input>
            ? SpecialFields<Input["properties"], { type: any, primary: true }> extends string
                ? IColumn.InvertType<Input["properties"][SpecialFields<Input["properties"], { type: any, primary: true }>]>
                : never
            : never;
}