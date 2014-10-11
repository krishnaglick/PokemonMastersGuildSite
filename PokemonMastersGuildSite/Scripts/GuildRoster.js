$(function () {
    var guild_roster_view_model = new GuildRosterModel();
    ko.applyBindings(guild_roster_view_model);
    guild_roster_view_model.getMembers();

    $('#showPlayer').on('hidden.bs.modal', function () {
        $(this).data('modal', null);
    });

    $('#showPlayer').on('show.bs.modal', function () {
        guild_roster_view_model.setSpec(2);
        
        //If there's only one spec, hide the second tab!
        if ($('.offSpec').text() == '') {
            $('.offSpec').toggleClass('hidden');
        }
        if ($('.mainSpec').text() == '') {
            $('.mainSpec').toggleClass('hidden');
        }
    });
});

function getPrimaryStats(returnedPlayer) {
    //Calculate what stats to show per role
    var Role = typeof returnedPlayer.talents[0].selected === 'undefined' ? returnedPlayer.talents[1].spec.role : returnedPlayer.talents[0].spec.role;
    var PrimaryStats = "";
    //For laziness
    var atrs = returnedPlayer.stats;
    switch (Role) {
        case "DPS":
            if (atrs.agi > atrs.str) { PrimaryStats = "<div class='stat'>Agility: " + atrs.agi + "</div>"; }
            else { PrimaryStats = "<div class='stat'>Strength: " + atrs.str + "</div>"; }
            PrimaryStats += "<div class='stat'>Hit: " + parseFloat(Math.round(atrs.hitPercent * 100) / 100).toFixed(2) + "%</div>" +
                            "<div class='stat'>Expertise: " + parseFloat(Math.round(atrs.mainHandExpertise * 100) / 100).toFixed(2) + "</div>";
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
    return PrimaryStats;
}

function getSecondaryStats(returnedPlayer) {
    return "<div class='stat'>Haste: " + parseFloat(Math.round(returnedPlayer.stats.haste * 100) / 100).toFixed(2) + "%</div>" +
                    "<div class='stat'>Crit: " + parseFloat(Math.round(returnedPlayer.stats.crit * 100) / 100).toFixed(2) + "%</div>" +
                    "<div class='stat'>Mastery: " + parseFloat(Math.round(returnedPlayer.stats.mastery * 100) / 100).toFixed(2) + "%</div>";
}

function getProgression(returnedPlayer) {
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
}

function getProfessions(returnedPlayer) {
    var profs = returnedPlayer.professions.primary;
    var professions = "";
    if (profs != '')
    {
        if(profs[0] != null && profs[1] != null)
        {
            professions = profs[0].name + '/' + profs[1].name;
        }
        else if(profs[0] != null && profs[1] == null)
        {
            professions = profs[0].name;
        }
        else
        {
            professions = profs[1].name;
        }
    }
    return professions;
}