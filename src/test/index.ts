import { DynamicImportIterator } from "./internal/DynamicImportIterator";

async function main(): Promise<void>
{
    await DynamicImportIterator.main
    (
        __dirname + "/features",
        {
            prefix: "test",
            parameters: [],
        }
    );
}
main().catch(exp =>
{
    console.log(exp);
    process.exit(-1);
})