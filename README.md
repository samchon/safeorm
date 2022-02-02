# **SafeORM**
## Outline
> Development of the `safeorm` has not been completed yet.
>
> Until the completion, only interfaces and test automation programs are provided. When the development has been completed, its 1st version `0.1.0` would be published. Before the completion, version of the `safeorm` would keep the `0.0.x`.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/samchon/safeorm/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/safeorm.svg)](https://www.npmjs.com/package/safeorm)
[![Downloads](https://img.shields.io/npm/dm/safeorm.svg)](https://www.npmjs.com/package/safeorm)
[![Build Status](https://github.com/samchon/safeorm/workflows/build/badge.svg)](https://github.com/samchon/safeorm/actions?query=workflow%3Abuild)

```bash
npm install --save safeorm
```

The ultimate **Safe ORM** library for the TypeScript.

  - Repository: https://github.com/samchon/safeorm
  - ~~Guide Documents: https://github.com/samchon/safeorm/wiki~~
  - ~~API Documents: https://samchon.github.io/safeorm/api~~
  - Template Project: https://github.com/samchon/backend

With **SafeORM**, you can define database and programmable type at the same time through the <font color="blue">TMP</font> (<font color="blue">Type Meta Programming</font>). Also, such type would be utilized in the whole **SafeORM** components level. Therefore, you can be helped by auto-completion with type hint when writing SQL query or planning App join.

Furthermore, you don't need to worry about any type of mistake when writing SQL query or planning App join. Your mistake would be caught in the compilation level. Therefore, if you type a wrong word on the SQL query, it would be enhanced by IDE through the <font color="red"><u>red underline</u></font>.

Unlike other ORM libraries who've to define DB and programmable type duplicatedly and cause <font color="red">critical runtime error</font> by not supporting the <font color="blue">TMP</font>, **SafeORM** supports those features through below components and they make the DB development to be much safer. Read below components and feel how <font color="blue">safe</font> it is.

  - [Entity](#entity): Define DB and TypeScript type at the time with TMP
  - [QueryBuilder](#querybuilder): Auto completion with type hint
  - [AppJoinBuilder](#appjoinbuilder): Same grammer with QueryBuilder and lazy app joiner
  - [JsonBuilder](#jsonselectbuilder): Automatic JSON type deduction with performance tuning
  - [InsertCollection](#insertcollection): Massive insertion with performance tuning






## Demonstrations
<!-- I'll demonstrate five principle components of **SafeORM**. 

They will show you that how the safe and convenient **SafeORM** is.

  - [Entity](#entity)
    - Ultimate safe TMP (Type Meta Programming) for the ORM
    - You can define DB and programmable type at the same time
    - Your definition would be utilized in the whole **SafeORM** components.
  - [QueryBuilder]($querybuilder)
    - Error would be detected in the compilation level
    - Auto completion would be provided
    - Type hint would be supported
  - [AppJoinBuilder](#appjoinbuilder)
    - Same gramer with the QueryBuilder
    - Helped by compiler and auto completion with type hints
    - Even support the Lazy App Join with binding
  - [JsonSelectBuilder](#jsonselectbuilder)
    - Exact JSON type would be automatically deduced
    - App Join would be automatically done
    - The performance would be automatically tuned
  - [InsertCollection](#insertcollection)
    - Sequence of tables would be automatically sorted by analyzing dependencies
    - The performance would be automatically tuned -->

### Entity
As you can see from the below example code, **SafeORM** supports the TMP (Type Meta Programming) ORM who can define database type and programmable type at the same time. When you define a column with database type, **SafeORM** would convert it to the programmable type automatically. 

Such automatic conversion even works for the relationship type. If you define a dependency relationship of the database, **SafeORM** converts it to the programmable relationship type, too. As you can see from the below, relationship functions like `Belongs.ManyToOne` and `Has.ManyToMany` define the database relationships and programmable accessors, at the same time.

Also, such `Entity` types can be utilized in whole components of the **SafeORM**. For an example, [QueryBuilder](#querybuilder) realizes the auto completion with type hint by analyzing the target `Entity` types.

```typescript
import safe from "safeorm";
import { BbsArticleTag } from "./BbsArticleTag";
import { BbsComment } from "./BbsComment";
import { BbsGroup } from "./BbsGroup";

export class BbsArticle
{
    //----
    // COLUMNS
    //----
    // BE `string`
    public readonly id = safe.PrimaryGeneratedColumn("uuid");

    // BE `Belongs.ManyToOne<BbsGroup, { nullable: true }>`
    //
    // `group.id` -> `string|null`
    // `group.get()` -> `Promise<BbsGroup|null>`
    public readonly group = safe.Belongs.ManyToOne
    (
        () => BbsGroup,
        { nullable: true, index: true }
    );

    // BE `string`
    public readonly title = safe.Column("varchar"); 

    // BE `string | null`
    public readonly sub_title = safe.Column("varchar", { nullable: true });
    public readonly title = safe.Column("varchar"); // `string`
    public readonly body = safe.Column("text"); // `string`
    public readonly created_at = safe.CreateDateColumn("datetime"); // `Date`
    public readonly updated_at = safe.UpdateDateColumn("datetime"); // `Date`
    public readonly deleted_at = safe.DeleteDateColumn("datetime"); // `Date | null`

    // BE `number`
    public hit = safe.Column("int");

    //----
    // HAS
    //----
    // BE `Has.OneToMany<BbsArticleTag>`
    //
    // `tags.get() -> Promise<BbsArticleTag>`
    public readonly tags = safe.Has.OneToMany
    (
        () => BbsArticleTag, 
        tag => tag.article
    );

    // BE `Has.OneToMany<BbsComment>`
    public readonly comments = safe.Has.OneToMany
    (
        () => BbsComment, 
        comment => comment.article
    );

    // BE `Has.ManyToMany`
    //
    // `files.get() -> Promise<AttachmentFile>`
    public readonly files = safe.Has.ManyToMany
    (
        () => AttachmentFile,
        () => BbsArticleFile,
        router => router.file,
        router => router.article,
        (x, y) => x.router.sequence - y.router.sequence // SORT FUNCTION
    );
}
safe.Index(BbsArticle, ["created_at", "deleted_at"]); // COMPOSITE INDEX
safe.Index(BbsArticle, "title"); // SINGULAR INDEX
safe.Table(BbsArticle); // BE TABLE
```

### QueryBuilder
When you've defined some [Entities](#entity), you can compose SQL query very easily and safely by this `QueryBuilder`. The `QueryBuilder` analyzes those [Entities](#entity) and supports the auto completion with type hint. 

Also, some mistakes like mis-written column name would be automatically detected in the compilation level. Therefore, you don't need to worry about any type of mistake when wrting the SQL query. All of the mistakes would be enhanced by IDE by the <font color="red"><u>red underline</u></font>. 

Look at the below gif image and feel how strong it is. Other ORM libraries like *TypeORM* never can provide such beautiful <font color="blue">TMP</font> (<font color="blue">Type Meta Programming</font>). They may cause <font color="red">the critical runtime error</font> for the mis-writiten SQL query.

![Safe Query Builder](https://raw.githubusercontent.com/samchon/safe-typeorm/master/assets/demonstrations/safe-query-builder.gif)

```typescript
export async function test_safe_query_builder(): Promise<void>
{
    const group: BbsGroup = await BbsGroup.findOneOrFail();
    const category: BbsCategory = await BbsCategory.findOneOrFail();

    const stmt: safe.SelectQueryBuilder<BbsQuestionArticle> = safe
        .createJoinQueryBuilder(BbsQuestionArticle, question =>
        {
            question.innerJoin("base", article =>
            {
                article.innerJoin("group");
                article.innerJoin("category");
                article.innerJoin("__mv_last").innerJoin("content");
            });
            question.leftJoin("answer")
                .leftJoin("base", "AA")
                .leftJoin("__mv_last", "AL")
                .leftJoin("content", "AC");
        })
        .andWhere(...BbsArticle.getWhereArguments("group", group))
        .andWhere(...BbsCategory.getWhereArguments("code", "!=", category.code))
        .select([
            BbsArticle.getColumn("id"),
            BbsGroup.getColumn("name", "group"),
            BbsCategory.getColumn("name", "category"),
            BbsArticle.getColumn("writer"),
            BbsArticleContent.getColumn("title"),
            BbsArticle.getColumn("created_at"),
            BbsArticleContent.getColumn("created_at", "updated_at"),

            BbsArticle.getColumn("AA.writer", "answer_writer"),
            BbsArticleContent.getColumn("AA.title", "answer_title"),
            BbsArticle.getColumn("AA.created_at", "answer_created_at"),
        ]);
    stmt;
}
```

### AppJoinBuilder
With the `AppJoinBuilder` class, you can implement application level joining very easily. 

Also, grammer of the `AppJoin!Builder` is exactly same with the `JoinQueryBuilder`. Therefore, you can swap `JoinQueryBuilder` and `AppJoinBuilder` very simply without any cost. Thus, you can just select one of them suitable for your case.

![Safe Query Builder](https://raw.githubusercontent.com/samchon/safe-typeorm/master/assets/demonstrations/app-join-builder.gif)

```typescript
export async function test_app_join_builder(): Promise<void>
{
    const builder: safe.AppJoinBuilder<BbsReviewArticle> = safe
        .createAppJoinBuilder(BbsReviewArticle, review =>
        {
            review.join("base", article =>
            {
                article.join("group");
                article.join("category");
                article.join("contents", content =>
                {
                    content.join("reviewContent");
                    content.join("files");
                });
                article.join("comments").join("files");
            });
        });
}
```

Furthermore, you've determined to using only the `AppJoinBuilder`, you can configure it much safely. With the `AppJoinBuilder.initialize()` method, you've configure all of the relationship accessors, and it prevents any type of ommission by your mistake.

```typescript
export async function test_app_join_builder_initialize(): Promise<void>
{
    const builder = safe.AppJoinBuilder.initialize(BbsGroup, {
        articles: safe.AppJoinBuilder.initialize(BbsArticle, {
            group: undefined,
            review: safe.AppJoinBuilder.initialize(BbsReviewArticle, {
                base: undefined,
            }),
            category: safe.AppJoinBuilder.initialize(BbsCategory, {
                articles: undefined,
                children: undefined,
                parent: "recursive"
            }),
            contents: safe.AppJoinBuilder.initialize(BbsArticleContent, {
                article: undefined,
                files: "join"
            }),
            comments: safe.AppJoinBuilder.initialize(BbsComment, {
                article: undefined,
                files: "join"
            }),
            tags: "join",
            __mv_last: undefined,
            question: undefined,
            answer: undefined,
        })
    });
}
```

If you want to perform the lazy app join instead of upper eager app joins, use the `bindAppJoin()` method instead. With the lazy app join binding, relationship accessors would never call the repeated `SELECT` query for the same type.

Look at the below code, then you may understand what the lazy app join is. As you can see, below code called relationshiop accessor for only one instance `topArticle: BbsArticle`. However, another `BbsArticle` instances also performs the application level join at the same time and never calls the `SELECT` query again. It's the lazy app join.

```typescript
export async function test_lazy_app_join(): Promise<void>
{
    const group: BbsGroup = await BbsGroup.findOneOrFail();
    safe.bindAppJoin(group);

    const articleList: BbsArticle[] = await group.articles.get();
    const topArticle: BbsArticle = articleList[0];

    // APP-JOIN WOULD BE DONE
    await topArticle.comments.get();
    await topArticle.files.get();
    await topArticle.tags.get();

    // ANY SELECT QUERY WOULD BE OCCURED
    await must_not_query_anything("bindAppJoin", async () =>
    {
        for (const article of articleList)
        {
            await article.comments.get();
            await article.files.get();
            await article.tags.get();
        }
    });
}
```

### JsonSelectBuilder
![Class Diagram](https://raw.githubusercontent.com/samchon/safe-typeorm/master/assets/designs/class-diagram.png)

In the **SafeORM**, when you want to load DB records and convert them to a <font color="purple">JSON</font> data, you don't need to write any `SELECT` or `JOIN` query. You also do not need to consider any performance tuning. Just write down the `ORM -> JSON` conversion plan, then **SafeORM** will do everything.

The `JsonSelectBuilder` is the class doing everything. It will analyze your <font color="purple">JSON</font> conversion plan, and compose the <font color="purple">JSON</font> conversion method automatically with the exact <font color="purple">JSON</font> type what you want. Furthermore, the `JsonSelectBuilder` finds the best (applicataion level) joining plan by itself.

Below code is an example converting ORM model class instances to <font color="purple">JSON</font> data with the `JsonSelectBuilder`. As you can see, there's no special script in the below code, but only the conversion plan exists. As I've mentioned, `JsonSelectBuilder` will construct the exact <font color="purple">JSON</font> type by analyzing your conversion plan. Also, the performance tuning would be done automatically. 

Therefore, just enjoy the `JsonSelectBuilder` without any worry.

```typescript
export async function test_json_select_builder(models: BbsGroup[]): Promise<void>
{
    const builder = BbsGroup.createJsonSelectBuilder
    ({
        articles: BbsArticle.createJsonSelectBuilder
        ({
            group: safe.DEFAULT, // ID ONLY
            category: BbsCategory.createJsonSelectBuilder
            ({ 
                parent: "recursive" as const, // RECURSIVE JOIN
            }),
            tags: BbsArticleTag.createJsonSelectBuilder
            (
                {}, 
                tag => tag.value // OUTPUT CONVERSION BY MAPPING
            ),
            contents: BbsArticleContent.createJsonSelectBuilder
            ({
                files: "join" as const
            }),
        })
    });

    // GET JSON DATA FROM THE BUILDER
    const raw = await builder.getMany(models);

    // THE RETURN TYPE IS ALWAYS EXACT
    // THEREFORE, TYPEOF "RAW" AND "I-BBS-GROUP" ARE EXACTLY SAME
    const regular: IBbsGroup[] = raw;
    const inverse: typeof raw = regular;
}
```

### InsertCollection
When you want to execute `INSERT` query for lots of records of plural tables, you've to consider dependency relationships. Also, you may construct extended SQL query manually by yourself, if you're interested in the performance tuning.

However, with the `InsertCollection` class provided by this **SafeORM**, you don't need to consider any dependcy relationship. You also do not need to consider any performance tuning. The `InsertCollection` will analyze the dependency relationships and orders the insertion sequence automatically. Also, the `InsertCollection` utilizes the extended insertion query for the optimizing performance.

```typescript
import safe from "safeorm";
import std from "tstl";

export async function archive
    (
        comments: BbsComment[],
        questions: BbsQuestionArticle[],
        reviews: BbsArticleReview[],
        groups: BbsGroup[],
        files: AttachmentFile[],
        answers: BbsAnswerArticle[],
        categories: BbsCategory[],
        comments: BbsComment[],
        articles: BbsArticle[],
        contents: BbsArticleContent[],
        tags: BbsArticleTag[],
    ): Promise<void>
{
    // PREPARE A NEW COLLECTION
    const collection: safe.InsertCollection = new safe.InsertCollection();
    
    // PUSH TABLE RECORDS TO THE COLLECTION WITH RANDOM SHULFFLING
    const massive = [
        comments,
        questions,
        reviews,
        groups,
        files,
        answers,
        comments,
        articles,
        contents,
        tags
    ];
    std.ranges.shuffle(massive);
    for (const records of massive)
        collection.push(records);

    // PUSH INDIVIDUAL RECORDS
    for (const category of categories)
        collection.push(category);
    
    // EXECUTE THE INSERT QUERY
    await collection.execute();
}
```