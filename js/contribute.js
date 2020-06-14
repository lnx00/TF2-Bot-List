function ConvertToTXT() {
    let txtOutput = "";
    let jsonInput = $("#inputField").val();
    let jsonObject = JSON.parse(jsonInput);

    let players = jsonObject.players;
    for (let i = 0; i < players.length; i++) {
        let cPlayerID3 = players[i].steamid;
        let cPlayerID = parseInt(cPlayerID3.substring(5, cPlayerID3.length - 1));
        let cPlayerID64 = parseInt(cPlayerID) ^ 0x110000100000000;

        txtOutput += cPlayerID64 + "\n";
    }
    $("#inputField").val(txtOutput);
}

function ConvertToJSON() {
    let txtInput = $("#inputField").val();
    let bots = txtInput.split("\n");

    let jsonObject = new Object();
    jsonObject.$schema = "./schema/playerlist.schema.json";
    jsonObject.version = 2;

    let players = [];
    for (let i = 0; i < bots.length; i++) {
        let cBot = bots[i];
        if (cBot.startsWith("//") || !cBot) {
            continue;
        }
        let steamID3 = parseInt(cBot) ^ 0x110000100000000;

        let cPlayer = new Object;
        cPlayer.attributes = ["cheater"];
        cPlayer.steamid = "[U:1:" + steamID3 + "]";
        players.push(cPlayer);
    }

    jsonObject.players = players;
    let jsonString = JSON.stringify(jsonObject, null, 3);
    $("#inputField").val(jsonString);
}

function FindNewBots() {
    let txtInput = $("#inputField").val();

    $.get("./lists/botlist.txt", function (data) { // Yes, I should store this list somewhere once. But I don't want to.
        let bots = data.split("\n");

        for (let i = 0; i < bots.length; i++) {
            let cBot = bots[i];
            if (cBot.startsWith("//") || !cBot) {
                continue;
            }
            let steamID = parseInt(cBot);
            txtInput.replace(steamID, "");
        }
    });
}