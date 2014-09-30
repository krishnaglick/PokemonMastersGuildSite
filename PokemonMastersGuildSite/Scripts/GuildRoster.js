//The view model for the list of guild members
var vm;

function loadPlayers() {
    $.ajax({
        type: "GET",
        url: 'http://us.battle.net/api/wow/guild/Blackrock/Pokemon%20Masters?fields=members&jsonp=bindMembers',
        dataType: "JSONP"
    });
}

//Get guild members, sift out member name plus rank
function bindMembers(data) {
    vm = {
        playerList: ko.observable($.map(data.members, function (member) {
            return {
                Name: member.character.name,
                Rank: member.rank
            };
        }).sort(function (a, b) {
            return a.Rank - b.Rank;
        })),
        loadPlayer: function () {
            //Not sure if this is the best order but it works, so fuck it, not changing!
            $('.modal-body').load('/Static/PlayerDetails.html');
            loadPlayer(this.Name);
            $('#showPlayer').modal();
            setTimeout(function () { activateTooltips(); }, 1250);

        }
    }
    ko.applyBindings(vm, $('.playerList')[0]);
}

$('#showPlayer').on('hidden', function () {
    $(this).data('modal', null);
});