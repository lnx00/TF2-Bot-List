// Create and Download playerlist.tf2bl.json
function DownloadJSON() {
    $.get("https://gist.githubusercontent.com/wgetJane/0bc01bd46d7695362253c5a2fa49f2e9/raw", function (data) { // Yes, I should store this list somewhere once. But I don't want to.
        /*let bots = data.split("\n");

        for (let i = 0; i < bots.length; i++) {
            let cID = bots[i];
            if (cID.startsWith("//") || !cID) {
                continue;
            }

            let cPlayer = new Object;
            cPlayer.attributes = ["cheater"];
            cPlayer.steamid = ID64toID3(cID);
            players.push(cPlayer);
        }

        jsonObject.players = players;
        let jsonString = JSON.stringify(jsonObject, null, 3); // Convert to formatted JSON*/
        let jsonString = ListToTF2B(data);
        if (jsonString) { DownloadFile("playerlist.tf2bl.json", jsonString); }
    }).catch(function() {
        
    });
}

// Create and Download voice_ban.dt
function DownloadVoiceBan() {
    $.get("https://gist.githubusercontent.com/wgetJane/0bc01bd46d7695362253c5a2fa49f2e9/raw", function (data) {
        if (!data) { return; }
        let botList = FilterList(data);
        let fileLength = 32 * botList.length + 4; // Calculate file size

        let vbFile = new Uint8Array(fileLength);
        vbFile[0] = 0x01;
        vbFile[1] = 0x00;
        vbFile[2] = 0x00;
        vbFile[3] = 0x00;

        let index = 4;
        for (let i = 0; i < botList.length; i++) {
            let cLine = botList[i];

            if (cLine.startsWith("//") || !cLine) {
                continue;
            }

            let cSteamId3 = ID64toID3(botList[i]);

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

        console.log(botList);
        DownloadBinFile("voice_ban.dt", vbFile);
    }).catch(function() {
        Swal.fire({
            title: "Error",
            text: "Could not connect to CORS Proxy",
            icon: "error"
        });
    });
}