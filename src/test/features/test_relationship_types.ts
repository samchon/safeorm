import { BbsArticle } from "../models/BbsArticle";
import { BbsComment } from "../models/BbsComment";
import { BbsGroup } from "../models/BbsGroup";

function test_group(): void
{
    const group = new BbsGroup();
    type Parent = ReturnType<typeof group.parent.get>;
    {
        let answer: Promise<BbsGroup|null> = {} as any;
        let trial: Parent = answer;
        trial = {} as any;
        answer = trial;
    }
}

function test_article(): void
{
    const article = new BbsArticle();
    type Comments = ReturnType<typeof article.comments.get>;
    {
        let answer: Promise<BbsComment[]> = {} as any;
        let trial: Comments = answer;
        trial = {} as any;
        answer = trial;
    }
    type Group = ReturnType<typeof article.group.get>;
    {
        let answer: Promise<BbsGroup> = {} as any;
        let trial: Group = answer;
        trial = {} as any;
        answer = trial;
    }
}

export function test_relationship_types(): void
{
    test_group;
    test_article;
}