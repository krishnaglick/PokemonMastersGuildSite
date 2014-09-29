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
            $('#loadingModal').modal();
            setTimeout(function () {
                $('#loadingModal').modal('hide');
                $('#showPlayer').modal({
                    remote: '/Static/PlayerDetails.html?player=' + this.Name,
                    show: true
                });
            }, 1000);
        }
    }
    ko.applyBindings(vm);
}

$('#showPlayer').on('hidden', function () {
    $(this).data('modal', null);
});