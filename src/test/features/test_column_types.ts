import { BbsArticleTag } from "../models/BbsArticleTag";
import { BbsGroup } from "../models/BbsGroup";

function test_group(): void
{
    const group = new BbsGroup();
    const id: string = group.id;
    const code: string = group.code;
    const created_at: Date = group.created_at;

    type Name = typeof group.name;
    {
        let answer: Name = group.name;
        let trial: string | null = answer;
        trial = {} as any;
        answer = trial;
    };
    type DeleteTime = typeof group.deleted_at;
    {
        let answer: DeleteTime = group.deleted_at;
        let trial: Date | null = answer;
        trial = {} as any;
        answer = trial;
    }

    id;
    code;
    created_at;
}

function test_article_tag(): void
{
    const tag = new BbsArticleTag();
    const id: string = tag.id;
    const value: string = tag.value;
    const sequence: number = tag.sequence;

    id;
    value;
    sequence;
}

export function test_column_types(): void
{
    test_group;
    test_article_tag;
}