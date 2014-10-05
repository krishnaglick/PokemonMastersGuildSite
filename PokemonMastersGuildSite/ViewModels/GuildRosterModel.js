GuildRosterModel = function () {
    this.player_list = ko.observable([]);
    this.player = ko.observable([]);
    this.bindPlayer();
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

GuildRosterModel.prototype.bindMembers = function(data) {
    this.player_list($.map(data.members, function (member) {
        return {
            Name: member.character.name,
            Rank: member.rank
        };
    }).sort(function (a, b) {
        return a.Rank - b.Rank;
    }));
}

GuildRosterModel.prototype.getPlayer = function(player) {
    var self = this;
    $.ajax({
        type: "GET",
        url: 'http://us.battle.net/api/wow/character/Blackrock/' + player.Name + '?fields=items,talents,professions,progression,stats',
        dataType: "jsonp",
        jsonp: 'jsonp'
    }).done(function(returnedPlayer) {
        self.player({
            Name: ko.observable(returnedPlayer.name),
            Pic: ko.observable("http://us.battle.net/static-render/us/" + returnedPlayer.thumbnail),
            Class: ko.observable(returnedPlayer.class),
            Race: ko.observable(returnedPlayer.race),
            Stats: ko.computed(function () {
                //Calculate what stats to show per role
                var Role = typeof returnedPlayer.talents[0].selected === 'undefined' ? returnedPlayer.talents[1].spec.role : returnedPlayer.talents[0].spec.role;
                var PrimaryStats = "";
                //For laziness
                var atrs = returnedPlayer.stats;
                switch (Role) {
                    case "DPS":
                        if (atrs.agi > atrs.str) { PrimaryStats = "<div class='stat'>Agility: " + atrs.agi + "</div>"; }
                        else { PrimaryStats = "<div class='stat'>Strength: " + atrs.str + "</div>"; }
                        break;
                    case "TANK":
                        PrimaryStats = "<div class='stat'>Health: " + atrs.health + "</div>" +
                                       "<div class='stat'>Dodge: " + parseFloat(Math.round(atrs.dodge * 100) / 100).toFixed(2) + "%</div>" +
                                       "<div class='stat'>Parry: " + parseFloat(Math.round(atrs.parry * 100) / 100).toFixed(2) + "%</div>";
                        break;
                    case "HEALING":
                        PrimaryStats = "<div class='stat'>Intellect: " + atrs.int + "</div>" +
                                       "<div class='stat'>Spirit: " + atrs.spr + "</div>" +
                                       "<div class='stat'>Spell Power: " + atrs.spellPower + "</div>";
                        break;
                    default:
                        return "Bad Player!";
                }
                PrimaryStats += "<div class='stat'>Haste: " + parseFloat(Math.round(atrs.haste * 100) / 100).toFixed(2) + "%</div>" +
                                "<div class='stat'>Crit: " + parseFloat(Math.round(atrs.crit * 100) / 100).toFixed(2) + "%</div>" +
                                "<div class='stat'>Mastery: " + parseFloat(Math.round(atrs.mastery * 100) / 100).toFixed(2) + "%</div>";
                return PrimaryStats;
            }),
            Spec: ko.observable(returnedPlayer.talents),
            HoverSpec: ko.observable(returnedPlayer.talents[0]),
            Progression: ko.computed(function () {
                //Figure out what to show for progression!
                var prog = returnedPlayer.progression.raids[31].bosses;
                var nKill = 0;
                var hKill = 0;
                $.each(prog, function (i, val) {
                    nKill = val.normalKills > 0 ? nKill + 1 : nKill;
                    hKill = val.heroicKills > 0 ? hKill + 1 : hKill;
                });
                kills = "";
                if (nKill > 0)
                    kills += "<div class='progression'>" + nKill + "/14 Normal</div>"
                if (hKill > 0)
                    kills += "<div class='progression'>" + hKill + "/14 Heroic</div>"
                return kills;
            }),
            Level: ko.observable(returnedPlayer.level),
            ilvl: ko.observable(returnedPlayer.items.averageItemLevelEquipped),
            Achives: ko.observable(returnedPlayer.achievementPoints),
            Professions: ko.observable(returnedPlayer.professions)
        });
    });
    this.bindPlayer();
}

GuildRosterModel.prototype.bindPlayer = function () {
    ko.applyBindings(this.player, $('.modal-body')[0]);
}