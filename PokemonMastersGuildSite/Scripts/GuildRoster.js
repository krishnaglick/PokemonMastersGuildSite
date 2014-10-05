//The view model for the list of guild members
var vm;

$(function () {
    var guild_roster_view_model = new GuildRosterModel();
    ko.applyBindings(guild_roster_view_model, $('.playerList')[0]);
    guild_roster_view_model.getMembers();

    var specData = {
        content: function () { return $('.tooltiptext').html(); },
        html: true,
        trigger: 'hover'
    }

    $('#spec1, #spec2').popover(specData);

    $('#spec1').hover(function () {
        tarPlayer.HoverSpec(tarPlayer.Spec()[0]);
    });

    $('#spec2').hover(function () {
        tarPlayer.HoverSpec(tarPlayer.Spec()[1]);
    });
})

$('#showPlayer').on('hidden', function () {
    $(this).data('modal', null);
});