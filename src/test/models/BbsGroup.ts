import safe from "../../index";
import { BbsArticle } from "./BbsArticle";

export class BbsGroup
{
    // COLUMNS
    public readonly id = safe.PrimaryGeneratedColumn("uuid");
    public readonly parent = safe.Belongs.ManyToOne
    (
        () => BbsGroup, 
        { nullable: true, index: true }
    );
    public readonly code = safe.Column("varchar", { unique: true });
    public readonly name = safe.Column("varchar", { 
        nullable: true, 
        index: true,
    });
    public readonly created_at = safe.CreateDateColumn("datetime");
    public readonly deleted_at = safe.DeleteDateColumn("datetime");

    // HAS
    public readonly articles = safe.Has.OneToMany
    (
        () => BbsArticle,
        article => article.group
    );
}
safe.Entity(BbsGroup);