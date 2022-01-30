import { BelongsManyToOne } from "./internal/BelongsManyToOne";
import { BelongsOneToOne } from "./internal/BelongsOneToOne";

export namespace Belongs
{
    export import ManyToOne = BelongsManyToOne;
    export import OneToOne = BelongsOneToOne;
}