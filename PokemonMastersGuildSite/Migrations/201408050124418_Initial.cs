namespace PokemonMastersGuildSite.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NewsStories",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                        postText = c.String(),
                        postDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.NewsStoryTags",
                c => new
                    {
                        tagName = c.String(nullable: false, maxLength: 128),
                        tagDesc = c.String(),
                        NewsStory_ID = c.Int(),
                    })
                .PrimaryKey(t => t.tagName)
                .ForeignKey("dbo.NewsStories", t => t.NewsStory_ID)
                .Index(t => t.NewsStory_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.NewsStoryTags", "NewsStory_ID", "dbo.NewsStories");
            DropIndex("dbo.NewsStoryTags", new[] { "NewsStory_ID" });
            DropTable("dbo.NewsStoryTags");
            DropTable("dbo.NewsStories");
        }
    }
}
