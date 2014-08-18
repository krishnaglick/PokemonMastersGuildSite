using PokemonMastersGuildSite.TestMethods;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace PokemonMastersGuildSite.Controllers
{
    public class NewsController : Controller
    {
        testMethods tm = new testMethods();
        Models.NewsStoryContext nsc = new Models.NewsStoryContext();

        public ActionResult Index()
        {
            Models.NewsStory[] posts = nsc.NewsStories.Include(x => x.newsStoryTags).ToArray<Models.NewsStory>();
            Array.Reverse(posts);
            ViewBag.posts = posts;
            ViewBag.stories = posts.Length;
            return View();
        }

        [HttpGet]
        public ActionResult Create()
        {
            ViewBag.tags = nsc.NewsStoryTags.Select(t => new SelectListItem { Value = t.tagName, Text = t.tagName });
            return View();
        }
        
        [HttpPost]
        public ActionResult Create(string postTitle, string postText, string[] tags)
        {
            string succeed = "Failure";
            var newNewsStory = new Models.NewsStory();

            List<Models.NewsStoryTag> newsTags = new List<Models.NewsStoryTag>();
            foreach(var tag in tags)
            {
                newsTags.Add(nsc.NewsStoryTags.Find(tag));
            }

            newNewsStory.newsStoryTags = newsTags;
            newNewsStory.postTitle = postTitle;
            newNewsStory.postText = postText;
            newNewsStory.postDate = System.DateTime.Now;
            newNewsStory.Username = tm.randStr();

            nsc.NewsStories.Add(newNewsStory);
            nsc.SaveChanges();

            return Json(succeed, JsonRequestBehavior.AllowGet);
        }
    }
}