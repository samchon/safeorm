import safe from "../..";
import { Same } from "../../typings/Same";
import { BbsArticle } from "../models/BbsArticle";
import { BbsArticleFile } from "../models/BbsArticleFile";
import { BbsComment } from "../models/BbsComment";
import { BbsGroup } from "../models/BbsGroup";

export function test_entity_primitive_types(): void
{
    type Group = Same<safe.Entity.Primitive<BbsGroup>,
    {
        id: string;
        code: string;
        name: string | null;
        created_at: string;
        deleted_at: string | null;
    }>;
    type Article = Same<safe.Entity.Primitive<BbsArticle>,
    {
        id: string;
        title: string;
        body: string;
        created_at: string;
        deleted_at: string | null;
    }>;
    type Comment = Same<safe.Entity.Primitive<BbsComment>,
    {
        id: string;
        body: string;
        created_at: string;
        deleted_at: string | null;
    }>;
    type ArticleFile = Same<safe.Entity.Primitive<BbsArticleFile>,
    {
        id: string;
        sequence: number;  
    }>;

    const group: Group = true;
    const article: Article = true;
    const comment: Comment = true;
    const articleFile: ArticleFile = true;

    [group, article, comment, articleFile];
}