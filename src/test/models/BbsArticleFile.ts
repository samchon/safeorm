import safe from "../..";
import { AttachmentFile } from "./AttachmentFile";
import { BbsArticle } from "./BbsArticle";

export class BbsArticleFile
{
    public readonly id = safe.PrimaryGeneratedColumn("uuid");
    public readonly article = safe.Belongs.ManyToOne(() => BbsArticle);
    public readonly file = safe.Belongs.ManyToOne(() => AttachmentFile, { index: true });
    public readonly sequence = safe.Column("int");
}
safe.Unique(BbsArticleFile, ["article", "file"]);
safe.Entity(BbsArticleFile);