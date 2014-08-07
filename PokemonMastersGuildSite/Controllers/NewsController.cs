using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using PokemonMastersGuildSite.TestMethods;

namespace PokemonMastersGuildSite.Controllers
{
    public class NewsController : Controller
    {
        testMethods tm = new testMethods();
        Models.NewsStoryContext nsc = new Models.NewsStoryContext();

        public ActionResult Index()
        {
            ViewBag.posts = nsc.NewsStories.Include(x => x.newsStoryTags).ToArray<Models.NewsStory>();
            ViewBag.stories = ViewBag.posts.Length;
            ViewBag.NewPost = false;
            return View();
        }

        public ActionResult Create()
        {
            Models.NewsStory ns = new Models.NewsStory();
            ns.Username = tm.randStr();
            ns.postText = tm.randStr() + tm.randStr() + tm.randStr();
            ns.postTitle = tm.randStr();
            Models.NewsStoryTag nst = new Models.NewsStoryTag(tm.randStr(), tm.randStr());
            ns.newsStoryTags.Add(nst);
            ns.postDate = System.DateTime.Now;


            nsc.NewsStories.Add(ns);
            nsc.SaveChanges();

            return View();
        }
    }
}