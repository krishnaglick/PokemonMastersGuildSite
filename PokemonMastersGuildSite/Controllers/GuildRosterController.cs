using System.Web;
using System.Web.Mvc;

namespace PokemonMastersGuildSite.Controllers
{
    public class GuildRosterController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Welcome(string name)//, int numTimes = 1)
        {
            ViewBag.Message = "Hello " + name;
            //ViewBag.NumTimes = numTimes;

            return View();
        }
    }
}