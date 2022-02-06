import type { Geometry } from "geojson";

export type ColumnType 
    = ColumnType.BooleanType
    | ColumnType.NumberType
    | ColumnType.BigintType
    | ColumnType.StringType
    | ColumnType.DateType
    | ColumnType.SpatialType;

export module ColumnType
{
    export type BooleanType = "bool";
    export type NumberType = "short" | "int" | "double" | "decimal";
    export type BigintType = "bigint";
    export type StringType = "uuid" | "char" | "varchar" | "text";
    export type DateType = "date" | "datetime" | "timestamp";
    export type SpatialType = "geometry";
    
    export type Decimable = "decimal";
    export type Lengthable = "char" | "varchar" | "int" | "bigint";
    export type Restriable = "short" | "int" | "char" | "varchar";
    export type Generatable = "short" | "int" | "bigint" | "uuid";

    export type InvertType<Type extends ColumnType>
        = Type extends ColumnType.BooleanType ? boolean
        : Type extends ColumnType.NumberType ? number
        : Type extends ColumnType.BigintType ? bigint
        : Type extends ColumnType.StringType ? string
        : Type extends ColumnType.DateType ? Date
        : Type extends ColumnType.SpatialType ? Geometry
        : never;
}