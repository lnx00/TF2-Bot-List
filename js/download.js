function DownloadJSON() {
    let jsonObject = new Object();
    jsonObject.$schema = "./schema/playerlist.schema.json";
    jsonObject.version = 2;

    let players = [];
    $.get("./lists/botlist.txt", function (data) { // Yes, you could store this list somewhere once. But I don't want to.
        let bots = data.split("\n");

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
        DownloadFile("playerlist.tf2bl.json", jsonString);
    });
}

function DownloadVoiceBan() {

}

function DownloadFile(filename, content) {
    let dlElement = document.createElement("a");
    dlElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    dlElement.setAttribute('download', filename);

    dlElement.style.display = 'none';
    document.body.appendChild(dlElement);

    dlElement.click();

    document.body.removeChild(dlElement);
}