import safe from "../..";

export class AttachmentFile
{
    public readonly id = safe.PrimaryGeneratedColumn("uuid");
    public readonly name = safe.Column("varchar");
    public readonly extension = safe.Column("varchar", { nullable: true });
    public readonly url = safe.Column("varchar", { length: 1024 });
}
safe.Entity(AttachmentFile);