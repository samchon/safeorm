import { Same } from "../../typings/Same";
import { AttachmentFile } from "../models/AttachmentFile";
import { BbsArticle } from "../models/BbsArticle";
import { BbsComment } from "../models/BbsComment";
import { BbsGroup } from "../models/BbsGroup";

export function test_relationship_types(): void
{
    const group: BbsGroup = {} as any;
    const article: BbsArticle = {} as any;

    type GroupParent = Same<ReturnType<typeof group.parent.get>, Promise<BbsGroup|null>>;
    type GroupArticles = Same<ReturnType<typeof group.articles.get>, Promise<BbsArticle[]>>;
    type ArticleGroup = Same<ReturnType<typeof article.group.get>, Promise<BbsGroup>>;
    type ArticleComments = Same<ReturnType<typeof article.comments.get>, Promise<BbsComment[]>>;
    type ArticleFiles = Same<ReturnType<typeof article.files.get>, Promise<AttachmentFile[]>>;

    type Exact = GroupParent & GroupArticles & ArticleGroup & ArticleComments & ArticleFiles;
    const exact: Exact = true;
    exact;
}