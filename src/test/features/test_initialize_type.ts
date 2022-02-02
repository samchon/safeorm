import { v4 } from "uuid";
import safe from "../..";

import { BbsArticle } from "../models/BbsArticle";
import { BbsGroup } from "../models/BbsGroup";

export function test_initialize_type(): void
{
    const group: BbsGroup = safe.initialize(BbsGroup, {
        id: v4(),
        parent: null,
        code: "some_code",
        name: "some name",
        created_at: new Date(),
        deleted_at: null,
    });

    const article: BbsArticle = safe.initialize(BbsArticle, {
        id: v4(),
        group,
        title: "some title",
        body: "some body",
        created_at: new Date(),
        deleted_at: null,
    });
    article;
}