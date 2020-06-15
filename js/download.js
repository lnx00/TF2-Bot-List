// Create and Download playerlist.tf2bl.json
function DownloadJSON() {
    let jsonObject = new Object();
    jsonObject.$schema = "./schema/playerlist.schema.json";
    jsonObject.version = 2;

    let players = [];
    $.get("./lists/botlist.txt", function (data) { // Yes, I should store this list somewhere once. But I don't want to.
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

// Create and Download voice_ban.dt
function DownloadVoiceBan() {
    $.get("./lists/botlist.txt", function (data) {
        data = data.replace("\r", "");
        data = data.split("\n");
        let fileLength = 32 * data.length + 4; // Calculate file size

        let vbFile = new Uint8Array(fileLength);
        vbFile[0] = 0x01;
        vbFile[1] = 0x00;
        vbFile[2] = 0x00;
        vbFile[3] = 0x00;

        let index = 4;
        for (let i = 0; i < data.length; i++) {
            let cLine = data[i];

            if (cLine.startsWith("//") || !cLine) {
                continue;
            }

            let cSteamId = parseInt(data[i]) ^ 0x110000100000000;
            let cSteamId3 = "[U:1:" + cSteamId + "]";

            for (let j = 0; j < 32; j++) { // For each char of id (max 32)
                if (cSteamId3.charCodeAt(j)) { // Check if char at j exist
                    vbFile[index] = cSteamId3.charCodeAt(j); // Push char to file
                } else {
                    vbFile[index] = 0x00; // Push 0x00 to file
                }
                index++;
            }
        }

        // Add 4 empty bytes at the end
        vbFile[index] = 0x00;
        index++;
        vbFile[index] = 0x00;
        index++;
        vbFile[index] = 0x00;
        index++;
        vbFile[index] = 0x00;

        DownloadBinFile(vbFile);
    });
}

// Download simple text files
function DownloadFile(filename, content) {
    let dlElement = document.createElement("a");
    dlElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    dlElement.setAttribute('download', filename);

    dlElement.style.display = 'none';
    document.body.appendChild(dlElement);

    dlElement.click();

    document.body.removeChild(dlElement);
}

// Download complex binary files
function DownloadBinFile(resultByte) {
    var bytes = new Uint8Array(resultByte);

    var blob = new Blob([bytes], {
        type: "application/octet-stream"
    });

    var dlElement = document.createElement('a');
    dlElement.href = window.URL.createObjectURL(blob);
    dlElement.download = "voice_ban.dt";
    dlElement.click();
}