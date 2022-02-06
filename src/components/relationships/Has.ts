import { HasOneToOne } from "./internal/HasOneToOne";
import { HasOneToMany } from "./internal/HasOneToMany";
import { HasManyToMany } from "./internal/HasManyToMany";

export module Has
{
    export import OneToOne = HasOneToOne;
    export import OneToMany = HasOneToMany;
    export import ManyToMany = HasManyToMany;
}