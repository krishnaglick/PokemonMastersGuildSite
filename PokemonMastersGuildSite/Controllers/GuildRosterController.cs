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
    }
}