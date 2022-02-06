import { BelongsManyToOne } from "./internal/BelongsManyToOne";
import { BelongsOneToOne } from "./internal/BelongsOneToOne";

export module Belongs
{
    export import ManyToOne = BelongsManyToOne;
    export import OneToOne = BelongsOneToOne;
}