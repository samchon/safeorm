import safe from "../../index";
import { AttachmentFile } from "./AttachmentFile";
import { BbsArticleFile } from "./BbsArticleFile";
import { BbsArticleTag } from "./BbsArticleTag";
import { BbsComment } from "./BbsComment";
import { BbsGroup } from "./BbsGroup";

export class BbsArticle
{
    // COLUMNS
    public readonly id = safe.PrimaryGeneratedColumn("uuid");
    public readonly group = safe.Belongs.ManyToOne(() => BbsGroup);
    public readonly title = safe.Column("varchar");
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

    public readonly files = safe.Has.ManyToMany
    (
        () => AttachmentFile,
        () => BbsArticleFile,
        router => router.file,
        router => router.article,
        (x, y) => x.router.sequence - y.router.sequence
    );
}
safe.Index(BbsArticle, ["group", "created_at", "deleted_at"]);
safe.Index(BbsArticle, "title");
safe.Entity(BbsArticle);