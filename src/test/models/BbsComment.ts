import safe from "../..";
import { BbsArticle } from "./BbsArticle";

export class BbsComment
{
    public readonly id = safe.PrimaryGeneratedColumn("uuid")
    public readonly article = safe.Belongs.ManyToOne(() => BbsArticle);
    public readonly body = safe.Column("text");
    public readonly created_at = safe.CreateDateColumn("datetime");
    public readonly deleted_at = safe.DeleteDateColumn("datetime");
}
safe.Index(BbsComment, ["article", "created_at", "deleted_at"]);
safe.Table(BbsComment);