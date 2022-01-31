import safe from "../..";
import { BbsArticle } from "./BbsArticle";

export class BbsArticleTag
{
    public readonly id = safe.PrimaryColumn("uuid");

    public readonly article = safe.Belongs.ManyToOne(() => BbsArticle);

    public readonly value = safe.Column("varchar", { index: true });

    public readonly sequence = safe.Column("int");
}
safe.Unique(BbsArticleTag, ["article", "value"]);