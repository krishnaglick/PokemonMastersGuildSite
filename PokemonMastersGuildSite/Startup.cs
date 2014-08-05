using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PokemonMastersGuildSite.Startup))]
namespace PokemonMastersGuildSite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
