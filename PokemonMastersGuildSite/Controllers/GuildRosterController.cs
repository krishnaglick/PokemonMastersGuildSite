using System.Web;
using System.Web.Mvc;
using WOWSharp.Community;
using WOWSharp.Community.Wow;

namespace PokemonMastersGuildSite.Controllers
{
    public class GuildRosterController : Controller
    {
        public ActionResult Index(string Name)
        {
            WowClient wc = new WowClient(Region.US);
            if (Name == null)
            {
                //var bs = wc.GetGuildAsync("Blackrock", "Pokemon Masters", GuildFields.Members).Result;
                //ViewBag.Roster = bs;
            }
            else
            {
                ViewBag.Member = wc.GetCharacterAsync("Blackrock", Name, CharacterFields.All).Result;
            }

            return View();
        }
    }
}