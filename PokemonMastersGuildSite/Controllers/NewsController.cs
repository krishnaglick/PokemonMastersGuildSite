using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PokemonMastersGuildSite.Controllers
{
    public class NewsController : Controller
    {
        Models.NewsStoryContext nsc = new Models.NewsStoryContext();
        public ActionResult Index()
        {
            ViewBag.posts = nsc.NewsStories.Include("newsStoryTags").ToArray<Models.NewsStory>();
            ViewBag.stories = ViewBag.posts.Length;
            return View();
        }
        System.Random r = new System.Random();
        public string randStr(int strSize)
        {
            string randString = "";
            char[] characters = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };

            for (int i = 1; i < strSize; i++)
            {
                randString += characters[r.Next(26)];
            }

            return randString;
        }
        public string randStr()
        {
            return randStr(6);
        }

        public ActionResult Create()
        {
            Models.NewsStory ns = new Models.NewsStory();
            ns.Username = randStr();
            ns.postText = randStr() + randStr() + randStr();
            ns.postTitle = randStr();
            Models.NewsStoryTag nst = new Models.NewsStoryTag(randStr(), randStr());
            ns.newsStoryTags.Add(nst);
            ns.postDate = System.DateTime.Now;


            nsc.NewsStories.Add(ns);
            nsc.SaveChanges();

            return View();
        }
    }
}