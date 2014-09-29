//Document Ready
$(function () {
    //Tooltip setup and control
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

//Load the player
function loadPlayer() {
    $.ajax({
        type: "GET",
        url: 'http://us.battle.net/api/wow/character/Blackrock/' + getUrlParameter('player') + '?fields=items,talents,professions,progression,stats,s&jsonp=getPlayer',
        dataType: "JSONP"
    });
}

var tarPlayer;

//Get the player
function getPlayer(returnedPlayer) {
    tarPlayer = {
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
                    if (atrs.agi > atrs.str) {PrimaryStats = "<div>Agility: " + atrs.agi + "</div>";}
                    else { PrimaryStats = "<div>Strength: " + atrs.str + "</div>"; }
                    break;
                case "TANK":
                    PrimaryStats = "<div>Health: " + atrs.health + "</div>" +
                                   "<div>Dodge: " + String(atrs.dodge).substring(0, 5) + "%</div>" +
                                   "<div>Parry: " + String(atrs.parry).substring(0, 5) + "%</div>";
                    break;
                case "HEALING":
                    PrimaryStats = "<div>Intellect: " + atrs.int + "</div>" +
                                   "<div>Spirit: " + atrs.spr + "</div>" +
                                   "<div>Spell Power: " + atrs.spellPower + "</div>";
                    break;
                default:
                    return "Bad Player!";
            }
            PrimaryStats += "<div>Haste: " + String(atrs.haste).substring(0, 5) + "%</div>" +
                            "<div>Crit: " + String(atrs.crit).substring(0, 5) + "%</div>" +
                            "<div>Mastery: " + String(atrs.mastery).substring(0, 5) + "%</div>";
            return PrimaryStats;
        }),
        Spec: ko.observable(returnedPlayer.talents),
        HoverSpec: ko.observable(returnedPlayer.talents[0]),
        Progression: ko.observable(returnedPlayer.progression.raids[31].bosses),
        Level: ko.observable(returnedPlayer.level),
        ilvl: ko.observable(returnedPlayer.items.averageItemLevelEquipped),
        Achives: ko.observable(returnedPlayer.achievementPoints),
        Professions: ko.observable(returnedPlayer.professions)
    }
    console.log(returnedPlayer);
    ko.applyBindings(tarPlayer);
}