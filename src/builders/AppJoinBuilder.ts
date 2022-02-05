import { Creator } from "../typings/Creator";
import { Entity } from "../components/Entity";
import { RelationshipType } from "../typings/RelationshipType";
import { OmitNever } from "../typings/OmitNever";
import { SpecialFields } from "../typings/SpecialFields";

/**
 * Application level join builder.
 * 
 * `AppJoinBuilder` is a helper class who can perform the application level join very 
 * easily. With this `AppJoinBuilder`, you don't need to implement the application level 
 * joining script, with the {@link HashMap}, by yourself. The joining would be done by 
 * this `AppJoinBuilder` automatically.
 * 
 * Also, you can build such `AppJoinBuilder` safely and conveniently. When you are 
 * building up an `AppJoinBuilder` instance from a specific ORM class, the 
 * `AppJoinBuilder` would analyze relationships of the target ORM class in the 
 * compilation level. Therefore, if you take any mistake, it would be detected in the
 * IDE directly. Besides, when you're finding neighbor entities to join, 
 * `AppJoinBuilder` will hint you through the auto-completion.
 * 
 * ![Hints by the Auto Completion](https://raw.githubusercontent.com/samchon/safe-typeorm/master/assets/demonstrations/app-join-builder.gif)
 * 
 * Furthermore, interface of the `AppJoinBuilder` is exactly same with the 
 * {@link JoinQueryBuilder}, another helper class who can implement DB join very 
 * conveniently and safely. Therefore, you can convert between `AppJoinBuilder` and 
 * {@link JoinQueryBuilder} in anytime. Feel free to selecting one of them and convert 
 * them whenever you want.
 * 
 * On the other hand, if you're performing this application level join only for the
 * JSON data construction, {@link JsonSelectBuilder} would be much suitable. In
 * {@link JsonSelectBuilder} also utilizes the application level joining and it even 
 * automates the JSON interface definition and data conversion in the compilation level.
 * 
 * ## What Application Join is:
 * The application level join means that joining related records are done not by the
 * DB join query, but through the manual application code using the {@link HashMap}
 * with their primary and foreign column values.
 * 
 * Comparing those DB join query and application level joining, the application level
 * joining consumes much fewer resources and its elapsed time is also much shorter than
 * the DB join query. Those differences grow up whenever the join relationship be more 
 * complicate.
 * 
 * Type         | DB Join   | App Join
 * :------------|----------:|----------:
 * Records      | 2,258,000 | 165
 * Elapsed Time | 8.07508   | 0.00262
 * 
 * @template Mine Target entity to perform the app join
 * @reference [stackoverflow/join-queries-vs-multiple-queries](https://stackoverflow.com/questions/1067016/join-queries-vs-multiple-queries)
 * @author Jeongho Nam - https://github.com/samchon
 */
export class AppJoinBuilder<Mine extends object>
{
    /* -----------------------------------------------------------
        CONSTRUCTORS
    ----------------------------------------------------------- */
    /**
     * Default Constructor.
     * 
     * @param mine Target ORM class to perform the app joining
     */
    public constructor(creator: Creator<Entity.Enable<Mine>>)
    {
    }

    /**
     * Configure a neighbor entity to join.
     * 
     * `AppJoinBuilder.join()` is a method configuring a neighbor entity to join, by 
     * specifying an accessor field of the *Mine* class, who've defined the 
     * relationship decorator with the target neighbor entity class.
     * 
     * You also can configure another app joining targets of the target neighbor
     * entity by writing *closure* function or calling additional methods to the 
     * returned `AppJoinBuilder` instance for the target neighbor entity. Of course,
     * such app join definition chaining would also benefic from the compilation type
     * checking and auto-completion hints, too.
     * 
     * If you've configured duplicated neighbor entity to join again, it will not affect 
     * to the app joining target. However, the *closure* function would be affected. 
     * Also, calling additional methods to the returned `AppJoinBuilder` instance for 
     * the target neighbor entity would be affected, too.
     * 
     * @param field Field of *Mine* who've defined the relationship decorator to join
     * @param closure Closure function for additional app joins for the target entity
     * @returns Emplaced `AppJoinBuilder` instance for the target entity
     */
    public join<Field extends AppJoinBuilder.Key<Mine>>
        (
            field: Field,
            closure?: AppJoinBuilder.Closure<RelationshipType.TargetType<Mine, Field>>
        ): AppJoinBuilder<RelationshipType.TargetType<Mine, Field>>
    {
        return null!;
    }

    /**
     * Safe factory method for the `AppJoinBuilder`.
     * 
     * ## Unintended Mistake
     * When creating an `AppJoinBuilder` instance and configuring neighbor entities
     * to be joined through the {@link AppJoinBuilder.join} method, you can take a 
     * mistake that omitting a specific neighbor entity.
     * 
     * If you take such mistake, there would not be any compile-time and run-time error
     * would be occurred. However, unintended SELECT statements would be repeatedly 
     * queried whenever you access to the specific relationship decorated member what 
     * you've omitted.
     * 
     * Therefore, if you take such mistake, you may failed to performance tuning 
     * through the application level joining plan.
     * 
     * ## Safe Initializer
     * To avoid such unintended mistake, you can use this factory method 
     * `AppJoinBuilder.initialize` with the {@link AppJoinBuilder.Initialized} typed
     * object, instead of creating the `AppJoinBuilder` instance by yourself and 
     * configuring manual app joins through the {@link AppJoinBuilder.join} method. 
     * 
     * The {@link AppJoinBuilder.Initialized} type enforces you to list up all of the 
     * relationship decorated fields. Even if you don't want to join with a specific 
     * neighbor entity, the {@link AppJoinBuilder.Initialized} type compels you to 
     * assign the `undefined` value on the matched relationship decorated field.
     * 
     *   - Assignable properties
     *     - `undefined`: do not join with the neighbor
     *     - `"join"`: join with the neighbor, but no cascade app joining more
     *     - `AppJoinBuilder<Neighbor> instance`: join with the neighbor and continue cascade app joining through a `AppJoinBuilder` instance
     *     - {@link AppJoinBuilder.Closure}: join with the neighbor and continue cascade app joining through a closure function
     * 
     * @param creator Target ORM class to perform the app joining
     * @param input List of relationship decorated fields with joining plan
     * @returns Newly created `AppJoinBuilder` instance
     */
    public static initialize<Mine extends object>
        (
            creator: Creator<Mine>, 
            input: AppJoinBuilder.Initialized<Mine>
        ): AppJoinBuilder<Mine>
    {
        return null!;
    }

    /**
     * Execute the application join.
     * 
     * `AppJoinBuilder.execute()` is the final execution method performing the 
     * application level joining, who've defined by {@link AppJoinBuilder.join} or 
     * {@link AppJoinBuilder.initialize}, to the *data*. Therefore after the execution, 
     * the *data* record(s) would be linked to the specified neighbor entity records.
     * 
     * However, you should know that, this method can't predicate whether the execution
     * on the *data* is duplicated or not. Thus, if you've changed some properties of 
     * a linked entity record after the execution and call this execution method again, 
     * you may lose the modified property values.
     * 
     * @param data Target record(s) to be joined
     */
    public async execute(data: Mine | Mine[]): Promise<void>
    {

    }

    /* -----------------------------------------------------------
        ACCESSORS
    ----------------------------------------------------------- */
    /**
     * Number of neighbor entities to be joined.
     */
    public get size(): number
    {
        return 0;
    }

    /**
     * Iterator of relationship decorator fields to be joined.
     */
    public keys(): IterableIterator<AppJoinBuilder.Key<Mine>>
    {
        return null!;
    }

    /**
     * Iterator of neighbor entities to be joined.
     */
    public values(): IterableIterator<AppJoinBuilder.Value<Mine>>
    {
        return null!;
    }

    /**
     * Iterator of key-value pairs to be joined.
     */
    public entries(): IterableIterator<AppJoinBuilder.Entry<Mine>>
    {
        return null!;
    }

    /**
     * For of iterator of entries to be joined. 
     */
    public [Symbol.iterator](): IterableIterator<AppJoinBuilder.Entry<Mine>>
    {
        return this.entries();
    }

    /**
     * Loop value-key pairs to be joined.
     * 
     * @param closure A function accepting value-key pairs for every elements
     */
    public forEach
        (
            closure: 
                (
                    value: AppJoinBuilder.Value<Mine>, 
                    key: AppJoinBuilder.Key<Mine>, 
                    thisArg: AppJoinBuilder<Mine>
                ) => void
        ): void
    {
    }

    /* -----------------------------------------------------------
        ELEMENTS I/O
    ----------------------------------------------------------- */
    /**
     * Test whether a specific neighbor entity has been configured.
     * 
     * @param key Field of *Mine* who've defined the relationship decorator to join
     * @returns Whether the specified neighbor entity has been configured or not
     */
    public has(key: SpecialFields<Mine, RelationshipType<any>>): boolean
    {
        return false;
    }

    /**
     * Get an `AppJoinBuilder` instance of a specific neighbor entity.
     * 
     * @param field Field of *Mine* who've defined the relationship decorator to join 
     * @returns `AppJoinBuilder` instance of the neighbor entity or `undefined`
     */
    public get<Field extends AppJoinBuilder.Key<Mine>>
        (
            field: Field
        ): AppJoinBuilder<RelationshipType.TargetType<Mine, Field>> | undefined
    {
        return null!;
    }

    /**
     * Assign an `AppJoinBuilder` instance to a specific field.
     * 
     * If you've already generated an `AppJoinBuilder` instance of the target neighbor 
     * entity to be joined, instead of re-generating the duplicated `AppJoinBuilder` 
     * instance by calling the {@link AppJoinBuilder.join} method, you can re-use the 
     * `AppJoinBuilder` instance through this `AppJoinBuilder.set()` method. 
     * 
     * @param field Field of *Mine* who've defined the relationship decorator to join
     * @param builder Pre-generated `AppJoinBuilder` instance to be assigned
     * @returns This `AppJoinBuilder` instance
     */
    public set<Field extends AppJoinBuilder.Key<Mine>>
        (
            field: Field,
            builder: AppJoinBuilder<RelationshipType.TargetType<Mine, Field>>
        ): this
    {
        return null!;
    }

    /**
     * Remove a specific neighbor entity to be joined.
     * 
     * @param field Field of *Mine* who've defined the relationship decorator to join
     * @returns Whether the specified neighbor has been configured and succeeded to remove it or not
     */
    public delete<Field extends AppJoinBuilder.Key<Mine>>
        (field: Field): boolean
    {
        return false;
    }
}

export namespace AppJoinBuilder
{
    /**
     * Closure function type for the {@link AppJoinBuilder.join}.
     */
    export type Closure<T extends object> = (builder: AppJoinBuilder<T>) => void;
    
    /**
     * Key type of the {@link AppJsonBuilder}.
     */
    export type Key<T extends object> = SpecialFields<T, RelationshipType<any>>;
    
    /**
     * Value type of the {@link AppJsonBuilder}.
     */
    export type Value<T extends object> = AppJoinBuilder<RelationshipType.TargetType<T, any>>;
    
    /**
     * Entry type of the {@link AppJsonBuilder}.
     */
    export type Entry<T extends object> = [Key<T>, Value<T>];

    /**
     * Initializer type for the {@link AppJsonBuilder.initialize}
     */
    export type Initialized<Mine extends object> = OmitNever<
    {
        [P in keyof Mine]: Mine[P] extends RelationshipType<infer Target>
            ? (AppJoinBuilder<Target> | undefined | Closure<Target> | "join") 
            : never;
    }>;

    /**
     * Maximum variable count of the parameter binding in one SQL query.
     */
    export let MAX_VARIABLE_COUNT: number = 32700;
}