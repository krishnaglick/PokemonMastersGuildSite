using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PokemonMastersGuildSite.Models
{
    public class NewsStory
    {
        [Key]
        public int ID { get; set; }
        public string Username { get; set; }
        public string postTitle { get; set; }
        public string postText { get; set; }
        public DateTime postDate { get; set; }
        public ICollection<NewsStoryTag> newsStoryTags { get; set; }

        public NewsStory()
        {
            newsStoryTags = new HashSet<NewsStoryTag>();
        }
    }

    public class NewsStoryTag
    {
        [Key]
        public string tagName { get; set; }
        public string tagDesc { get; set; }

        public NewsStoryTag(string tName, string tDesc)
        {
            tagName = tName;
            tagDesc = tDesc;
        }
        public NewsStoryTag() { }
    }

    public class NewsStoryContext : DbContext
    {
        public DbSet<NewsStory> NewsStories { get; set; }
        public DbSet<NewsStoryTag> NewsStoryTags { get; set; }
    }
}