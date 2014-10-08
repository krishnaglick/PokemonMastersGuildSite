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
        console.log(returnedPlayer);
        self.player({
            Name: returnedPlayer.name,
            Pic: "http://us.battle.net/static-render/us/" + returnedPlayer.thumbnail,
            Class: returnedPlayer.class,
            Race: returnedPlayer.race,
            PrimaryStats: getPrimaryStats(returnedPlayer),
            SecondaryStats: getSecondaryStats(returnedPlayer),
            Spec: returnedPlayer.talents,
            HoverSpec: ko.observable(returnedPlayer.talents[0]),
            Progression: getProgression(returnedPlayer),
            Level: returnedPlayer.level,
            ilvl: returnedPlayer.items.averageItemLevelEquipped,
            Achives: returnedPlayer.achievementPoints,
            Professions: getProfessions(returnedPlayer)
        });
        $('#showPlayer').modal();
    });
}

GuildRosterModel.prototype.setSpec = function (spec) {
    if (spec == 2)
    {
        spec = typeof this.player().Spec[0].selected === 'undefined' ? 1 : 0;
    }
    this.player().HoverSpec(this.player().Spec[spec]);
    if (spec == 0) {
        $(document).find('.mainSpec').addClass('specActive').removeClass('specInactive');
        $(document).find('.offSpec').removeClass('specActive').addClass('specInactive');
    }
    else {
        $(document).find('.mainSpec').removeClass('specActive').addClass('specInactive');
        $(document).find('.offSpec').addClass('specActive').removeClass('specInactive');
    }
}