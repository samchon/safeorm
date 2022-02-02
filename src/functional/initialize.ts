import { Entity } from "../components/Entity";
import { Creator } from "../typings/Creator";
import { Initialized } from "../typings/Initialized";

export function initialize<T extends object>
    (
        target: Creator<Entity.Enable<T>>,
        input: Initialized<T>
    ): T
{
    const output: T = new target;

    return output;
}