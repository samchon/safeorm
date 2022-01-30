import safe from "../../index";
import { BbsArticle } from "./BbsArticle";

export const BbsGroup = safe.Table({
    properties: {
        // COLUMNS
        id: safe.PrimaryGeneratedColumn("uuid"),
        code: safe.Column("varchar", false, { unique: true }),
        name: safe.Column("varchar", true, { index: true }),
        created_at: safe.CreateDateColumn("datetime"),
        deleted_at: safe.DeleteDateColumn("datetime"),

        // HAS
    }
});
export type BbsGroup = safe.Table.Instance<typeof BbsGroup>;