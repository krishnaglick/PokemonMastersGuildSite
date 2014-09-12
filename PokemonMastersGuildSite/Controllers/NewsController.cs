using PokemonMastersGuildSite.TestMethods;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using PagedList;

namespace PokemonMastersGuildSite.Controllers
{
    public class NewsController : Controller
    {
        testMethods tm = new testMethods();
        Models.NewsStoryContext nsc = new Models.NewsStoryContext();

        public ActionResult Index()
        {
            Models.NewsStory[] posts = nsc.NewsStories.Include(x => x.newsStoryTags).OrderByDescending(n => n.postDate).ToArray<Models.NewsStory>();
            int page = HttpContext.Request.QueryString["page"] != null ? Convert.ToInt32(HttpContext.Request.QueryString["page"]) : 1;
            var pagedPosts = posts.ToPagedList(page, 5);
            ViewBag.posts = pagedPosts;
            return View();
        }

        [HttpGet]
        public ActionResult Create()
        {
            ViewBag.tags = "['" + string.Join("', '", nsc.NewsStoryTags.Select(t => t.tagName).ToArray<string>()) + "']";
            return View();
        }
        
        [HttpPost]
        public ActionResult Create(string postTitle, string postText, string[] tags)
        {
            string succeed = "Failure";
            var newNewsStory = new Models.NewsStory();

            List<Models.NewsStoryTag> newsTags = new List<Models.NewsStoryTag>();

            if (tags != null)
            {
                foreach (var tag in tags)
                {
                    var getTag = nsc.NewsStoryTags.Find(tag);
                    if (getTag != null)
                        newsTags.Add(getTag);
                }
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