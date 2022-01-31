import safe from "../../index";
import { BbsArticleTag } from "./BbsArticleTag";
import { BbsComment } from "./BbsComment";
import { BbsGroup } from "./BbsGroup";

export class BbsArticle
{
    // COLUMNS
    public readonly id = safe.PrimaryGeneratedColumn("uuid");
    public readonly group = safe.Belongs.ManyToOne
    (
        () => BbsGroup, 
        { index: true }
    );
    public readonly title = safe.Column("varchar", { index: true });
    public readonly body = safe.Column("text");
    public readonly created_at = safe.CreateDateColumn("datetime");
    public readonly deleted_at = safe.DeleteDateColumn("datetime");

    // HAS
    public readonly tags = safe.Has.OneToMany
    (
        () => BbsArticleTag, 
        tag => tag.article
    );

    public readonly comments = safe.Has.OneToMany
    (
        () => BbsComment,
        comment => comment.article
    );
}

const article: BbsArticle = new BbsArticle();
const group: Promise<BbsGroup> = article.group.get();
const id: string = article.id;
const title: string = article.title;
const body: string = article.body;
const created_at: Date = article.created_at;
const deleted_at: Date | null = article.deleted_at;