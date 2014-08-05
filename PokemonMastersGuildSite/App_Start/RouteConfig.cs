using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PokemonMastersGuildSite
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}",
                defaults: new { controller = "Home", action = "Index" }
            );

            routes.MapRoute(
                name: "GuildRoster",
                url: "{controller}/{action}/{name}",
                defaults: new { controller = "GuildRoster", action = "Index", name = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "News",
                url: "{controller}/{action}/{order}/{tags}",
                defaults: new { controller="News", action = "Index", order = "Desc", tags = UrlParameter.Optional }
            );
        }
    }
}
