export class InsertCollection
{
    public constructor(public readonly limit: number = InsertCollection.DEFAULT_LIMIT)
    {
    }

    public async execute(): Promise<void>
    {
    }

    /* -----------------------------------------------------------
        ELEMENTS I/O
    ----------------------------------------------------------- */
    public push<T extends object>(record: T, ignore?: string|boolean): T;
    public push<T extends object>(records: T[], ignore?: string|boolean): T[];
    public push<T extends object>(input: T | T[], ignore: string|boolean = false): T | T[]
    {
        return null!;
    }

    public before(process: InsertCollection.Process): void
    {

    }

    public after(process: InsertCollection.Process): void
    {

    }
}
export namespace InsertCollection
{
    export interface Process
    {
        (): Promise<any>;
    }

    /**
     * Default piece count for the extended insert query.
     */
    export let DEFAULT_LIMIT: number = 1000;
}