import safe from "../../index";
import { BbsGroup } from "./BbsGroup";

export const BbsArticle = safe.Table({
    properties: {
        // COLUMNS
        id: safe.PrimaryGeneratedColumn("uuid"),
        group: safe.Belongs.ManyToOne(() => BbsGroup, true, {
            index: true,
        }),
        title: safe.Column("varchar", false, { index: true }),
        body: safe.Column("text", false),
        created_at: safe.CreateDateColumn("datetime"),
        deleted_at: safe.DeleteDateColumn("datetime"),
    }
});
export type BbsArticle = safe.Table.Instance<typeof BbsArticle>;