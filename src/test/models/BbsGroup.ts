import safe from "../../index";
import { BbsArticle } from "./BbsArticle";

export class BbsGroup
{
    // COLUMNS
    public readonly id = safe.PrimaryGeneratedColumn("uuid");
    public readonly parent = safe.Belongs.ManyToOne
    (
        () => BbsGroup, 
        { nullable: true }
    );
    public readonly code = safe.Column("varchar", { unique: true });
    public readonly name = safe.Column("varchar", { 
        nullable: true, 
        index: true 
    });
    public readonly created_at = safe.CreateDateColumn("datetime");
    public readonly deleted_at = safe.DeleteDateColumn("datetime");

    // HAS
    public readonly articles = safe.Has.OneToMany
    (
        () => BbsArticle,
        article => article.group
    )
}

const group: BbsGroup = new BbsGroup();
const id: string = group.id;
const parent: Promise<BbsGroup|null> = group.parent.get();
const code: string = group.code;
const name: string | null = group.name;
const created_at: Date = group.created_at;
const deleted_at: Date | null = group.deleted_at;
const articles: Promise<BbsArticle[]> = group.articles.get();
const parent_id: string = group.parent.id;