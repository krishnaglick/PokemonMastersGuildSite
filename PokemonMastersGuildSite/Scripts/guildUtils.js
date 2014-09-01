function getRankName(i) {
    switch (i) {
        case 0:
            return "League Champion";
        case 1:
        case 2:
            return "Elite 4";
        case 3:
            return "E4 Alt";
        case 4:
            return "Gym Leader";
        case 5:
            return "Gym Leader Alt";
        case 6:
            return "Ace Trainer";
        case 7:
            return "Trainer";
        case 8:
            return "Rookie";
        default:
            return "What";
    }
}