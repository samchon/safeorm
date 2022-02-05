import safe from "../..";
import { PromiseInvert } from "../../typings/PromiseInvert";
import { Same } from "../../typings/Same";
import { AttachmentFile } from "../models/AttachmentFile";
import { BbsArticle } from "../models/BbsArticle";
import { BbsArticleTag } from "../models/BbsArticleTag";
import { BbsComment } from "../models/BbsComment";
import { BbsGroup } from "../models/BbsGroup";

export function test_json_builder_types(): void
{
    const builder = new safe.JsonSelectBuilder(BbsGroup, 
    {
        parent: "recursive",
        articles: new safe.JsonSelectBuilder(BbsArticle, 
        {
            group: safe.DEFAULT,
            comments: "join" as const,
            files: "join" as const,
            tags: new safe.JsonSelectBuilder(BbsArticleTag, {}, tag => tag.value)
        }),
    });

    type Output = PromiseInvert<ReturnType<typeof builder.getOne>>;
    type Exact = Same<Output, IGroup>;
    const exact: Exact = true;
    exact;
}

interface IGroup extends safe.Entity.Primitive<BbsGroup>
{
    parent: safe.JsonSelectBuilder.Output.RecursiveReference<BbsGroup, "parent"> | null;
    articles: IArticle[];
}

interface IArticle extends safe.Entity.Primitive<BbsArticle>
{
    group: string;
    comments: safe.Entity.Primitive<BbsComment>[];
    files: safe.Entity.Primitive<AttachmentFile>[];
    tags: string[];
}