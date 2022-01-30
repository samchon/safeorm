import { Belongs } from "./relationships/Belongs";
import { IColumn } from "../structures/IColumn";
import { RelationshipType } from "../typings/RelationshipType";
import { Has } from "./relationships/Has";

export type Table<Input extends Table.IProps<any>> 
    = Input extends Table.IProps<infer Members> ?
({
    [P in keyof Members]
        : Members[P] extends IColumn<any, any> ? IColumn.InvertType<Members[P]>
        : Members[P] extends RelationshipType<any>
            ? Members[P] extends Belongs.ManyToOne.IProps<infer Target, infer Nullable>
                ? Belongs.ManyToOne<Target, Nullable>
            : Members[P] extends Belongs.OneToOne.IProps<infer Target, infer Nullable>
                ? Belongs.OneToOne<Target, Nullable>
            : Members[P] extends Has.OneToOne.IProps<infer Target, infer Ensure>
                ? Has.OneToOne<Target, Ensure>
            : Members[P] extends Has.OneToMany.IProps<infer Target>
                ? Has.OneToMany<Target>
            : Members[P] extends Has.ManyToMany.IProps<infer Target, infer Router>
                ? Has.ManyToMany<Target, Router>
                : never
        : Members[P]
}) : never;

export function Table<
        Columns extends Record<string, IColumn<any, any> | RelationshipType<any>>,
        Input extends Table.IProps<Columns>>
    (input: Input): Table.Creator<Table<Input>, Input>
{
    return {} as any;
}

export namespace Table
{
    export interface IProps<Properties extends object>
    {
        name?: string;
        properties: Properties;
    }

    export interface Creator<
            T extends Table<any>, 
            Input extends Table.IProps<any>>
    {
        new(): T;
        metadata: IMetadata<Input>;
    };

    export type IMetadata<Input extends Table.IProps<any>> = 
    {
        name: string;
        columns: 
        {
            [P in keyof Input["properties"]]: Input["properties"][P] extends IColumn<any, any>
                ? Input["properties"][P]
                : never;
        };
        relationships: 
        {
            [P in keyof Input["properties"]]: Input["properties"][P] extends RelationshipType<any>
                ? Input["properties"][P]
                : never;
        }
    }

    export type Instance<Target extends Creator<any, any>> 
        = Target extends Creator<infer U, any> ? U : never;
}