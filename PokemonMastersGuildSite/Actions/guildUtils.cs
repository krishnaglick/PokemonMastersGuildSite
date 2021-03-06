﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PokemonMastersGuildSite.Actions
{
    public class guildUtils
    {
        System.Random r = new System.Random();

        public string randStr(int strSize)
        {
            string randString = "";
            char[] characters = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' };

            for (int i = 1; i < strSize; i++)
            {
                randString += characters[r.Next(26)];
            }

            return randString;
        }
        public string randStr()
        {
            return randStr(6);
        }

        string[] Officers = { "Prometheus", "Brutongaster", "Wounder", "Stonedmonk", "Beaconater", "Maryjaiyne" };

        public bool isOfficer(string user)
        {
            if (Officers.Any(s => s == user))
                return true;

            return false;
        }

    }
}