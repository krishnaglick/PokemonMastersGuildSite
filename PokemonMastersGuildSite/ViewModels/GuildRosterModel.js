var GuildRosterModel = function () {
    this.player_list = ko.observableArray();
    this.player = ko.observable();
}

GuildRosterModel.prototype.getMembers = function () {
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://us.battle.net/api/wow/guild/Blackrock/Pokemon%20Masters?fields=members',
        dataType: "jsonp",
        jsonp: 'jsonp'
    }).done(self.bindMembers.bind(self));
}

GuildRosterModel.prototype.bindMembers = function (data) {
    this.player_list($.map(data.members, function (member) {
        return {
            Name: member.character.name,
            Rank: member.rank
        };
    }).sort(function (a, b) {
        return a.Rank - b.Rank;
    }));
}

GuildRosterModel.prototype.getPlayer = function (player) {
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://us.battle.net/api/wow/character/Blackrock/' + player.Name + '?fields=items,talents,professions,progression,stats',
        dataType: "jsonp",
        jsonp: 'jsonp'
    }).done(function (returnedPlayer) {
        self.player({
            Name: returnedPlayer.name,
            Pic: "http://us.battle.net/static-render/us/" + returnedPlayer.thumbnail,
            Class: returnedPlayer.class,
            Race: returnedPlayer.race,
            Stats: getStats(returnedPlayer),
            Spec: returnedPlayer.talents,
            HoverSpec: returnedPlayer.talents[0],
            Progression: getProgression(returnedPlayer),
            Level: returnedPlayer.level,
            ilvl: returnedPlayer.items.averageItemLevelEquipped,
            Achives: returnedPlayer.achievementPoints,
            Professions: returnedPlayer.professions
        });

        $('#showPlayer').modal();
    });
}

GuildRosterModel.prototype.setSpec = function (spec) {
    this.player().HoverSpec = this.player().Spec[spec];
}