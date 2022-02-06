import { DEFAULT } from "../components/DEFAULT";
import { Entity } from "../components/Entity";
import { Belongs } from "../components/relationships/Belongs";
import { Has } from "../components/relationships/Has";
import { Creator } from "../typings/Creator";
import { OmitNever } from "../typings/OmitNever";
import { RelationshipType } from "../typings/RelationshipType";
import { Same } from "../typings/Same";

/**
 * JSON Select Builder.
 * 
 * @template Mine Target entity to convert to JSON data
 * @template InputT Type of input listing up the joining plans
 * @template Destination Output JSON type. Default is {@link JsonSelectBuilder.Output}
 * @author Jeongho Nam - https://github.com/samchon
 */
export class JsonSelectBuilder<
        Mine extends object, 
        InputT extends JsonSelectBuilder.Input<Mine>,
        Destination = JsonSelectBuilder.Output<Mine, InputT>>
{
    /* -----------------------------------------------------------
        CONSTRUCTORS
    ----------------------------------------------------------- */
    /**
     * Default Constructor.
     * 
     * @param mine Target ORM class to perform the DB join
     * @param input List of relationship decorated fields with joining plan
     * @param mapper Map function to convert output type
     */
    public constructor
        (
            mine: Creator<Mine>, 
            public readonly input: Readonly<InputT>, 
            public readonly mapper?: JsonSelectBuilder.Output.Mapper<Mine, InputT, Destination>
        )
    {
        
    }
    
    /**
     * Execute app join.
     * 
     * @param data Target record(s) to be joined
     */
    public async join(data: Mine | Mine[]): Promise<void>
    {

    }

    /* -----------------------------------------------------------
        ACCESSORS
    ----------------------------------------------------------- */
    /**
     * 
     * @param record 
     * @returns 
     */
    public async getOne(record: Mine): Promise<Destination>
    {
        const data: Destination[] = await this.getMany([ record ]);
        return data[0];
    }

    /**
     * 
     * @param records 
     * @returns 
     */
    public async getMany(records: Mine[]): Promise<Destination[]>
    {
        return null!;
    }
}

export module JsonSelectBuilder
{
    /**
     * 
     */
    export type Input<Mine extends object> = Partial<OmitNever<
    {
        [P in keyof Mine]: Mine[P] extends RelationshipType<infer Target>
            ? Mine[P] extends BelongsCommon<Target, infer TargetOptions>
                ? TargetOptions extends { nullable: true }
                    ? Same<Mine, Target> extends true
                        ? "recursive" | "join" | DEFAULT | undefined
                        : JsonSelectBuilder<Target, any, any> | "join" | DEFAULT | undefined
                    : Same<Mine, Target> extends true 
                        ? "recursive" | "join" | DEFAULT | undefined
                        : JsonSelectBuilder<Target, any, any> | "join" | DEFAULT | undefined
            : Same<Mine, Target> extends true
                ? "recursive" | "join" | undefined
                : JsonSelectBuilder<Target, any, any> | "join" | undefined
            : never
    }>>;

    /**
     * 
     */
    export type Output<
            Mine extends object, 
            InputT extends object> = Entity.Primitive<Mine> & OmitNever<
    {
        [P in keyof (Mine|InputT)]
            : InputT[P] extends JsonSelectBuilder<infer Target, any, infer Destination>
                ? Mine[P] extends BelongsCommon<Target, infer Options>
                    ? Options extends { nullable: true }
                        ? Destination | null
                        : Destination
                : Mine[P] extends Has.OneToOne<Target, infer Options>
                    ? Options extends { nullable: true }
                        ? Destination | null
                        : Destination
                : Destination[]
            : InputT[P] extends "recursive"
                ? Mine[P] extends BelongsCommon<Mine, infer Options>
                    ? Options extends { nullable: true }
                        ? Output.RecursiveReference<Mine, P> | null
                        : never // never be happened
                : Mine[P] extends Has.OneToOne<Mine, infer Options>
                    ? Options extends { nullable: true }
                        ? Output.RecursiveReference<Mine, P> | null
                        : never // never be happened
                : Mine[P] extends HasManyCommon<Mine> 
                    ? Output.RecursiveArray<Mine, P>
                : Mine[P] extends Has.ManyToMany<Mine, any> 
                    ? Output.RecursiveArray<Mine, P>
                : never
            : InputT[P] extends DEFAULT
                ? Mine[P] extends BelongsCommon<infer Target, infer Options>
                    ? Options extends { nullable: true }
                        ? RelationshipType.DeductPrimaryType<Target> | null
                        : RelationshipType.DeductPrimaryType<Target>
                : never
            : InputT[P] extends "join"
                ? Mine[P] extends BelongsCommon<infer Target, infer Options>
                    ? Options extends { nullable: true }
                        ? Entity.Primitive<Target> | null
                        : Entity.Primitive<Target>
                : Mine[P] extends Has.OneToOne<infer Target, infer Options>
                    ? Options extends { nullable: true }
                        ? Entity.Primitive<Target> | null
                        : Entity.Primitive<Target>
                : Mine[P] extends HasManyCommon<infer Target>
                    ? Entity.Primitive<Target>[]
                    : never
            : never;
    }>;
    export module Output
    {
        /**
         * 
         */
        export type RecursiveReference<
                Mine extends object,
                Key extends keyof Mine>
            = Entity.Primitive<Mine> &
        {
            [P in Key]: RecursiveReference<Mine, Key> | null;
        };

        /**
         * 
         */
        export type RecursiveArray<
                Mine extends object, 
                Key extends keyof Mine>
            = Entity.Primitive<Mine> &
        {
            [P in Key]: RecursiveArray<Mine, Key>[];
        };

        /**
         * 
         */
        export interface Mapper<Mine extends object, InputT extends Input<Mine>, Destination> 
        {
            (
                output: Output<Mine, InputT>,
                model: Mine,
            ): Destination;
        }
    }

    type BelongsCommon<
            Target extends object,  
            Options extends { nullable?: boolean }>
        = Belongs.ManyToOne<Target, Options>
        | Belongs.OneToOne<Target, Options>;

    type HasManyCommon<Target extends object>
        = Has.OneToMany<Target>
        | Has.ManyToMany<Target, any>;
}