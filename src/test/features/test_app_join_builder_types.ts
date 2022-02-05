import { AppJoinBuilder } from "../../builders/AppJoinBuilder";
import { BbsGroup } from "../models/BbsGroup";

export function test_app_join_builder_types(): void
{
    new AppJoinBuilder(BbsGroup).join("articles", article =>
    {
        article.join("comments");
        article.join("files");
        article.join("tags");
    });
}