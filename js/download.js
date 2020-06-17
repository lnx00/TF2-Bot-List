const TF2B_FILE_REGEX = /(tf2_bot_detector_).*(\.zip)/

// Filter and Download botList.txt
function DownloadList() {
    $.get(BOT_LIST_URL, function (data) {
        let botList = FilterList(data);
        let listText = "";
        for (let i = 0; i < botList.length; i++) {
            listText += botList[i] + ((i < botList.length - 1) ? "\n" : "");
        }
        if (botList) { DownloadFile("botList.txt", listText); }
    }).catch(function() {
        Swal.fire({
            title: "Error",
            text: "Connection to CORS Proxy failed",
            icon: "error"
        });
    });
}

// Create and Download playerlist.tf2bl.json
function DownloadJSON() {
    $.get(BOT_LIST_URL, function (data) {
        let jsonString = ListToTF2B(data);
        if (jsonString) { DownloadFile("playerlist.tf2bl.json", jsonString); }
    }).catch(function() {
        Swal.fire({
            title: "Error",
            text: "Connection to CORS Proxy failed",
            icon: "error"
        });
    });
}

// Create and Download voice_ban.dt
function DownloadVoiceBan() {
    $.get(BOT_LIST_URL, function (data) {
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
                    vbFile[index] = cSteamId3.charCodeAt(j); // Add char at [j] to file
                } else {
                    vbFile[index] = 0x00; // Add 0x00 at [j] to file
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
            text: "Connection to CORS Proxy failed",
            icon: "error"
        });
    });
}

// Download the latest TF2 Bot Detector zip because GitHub is too complicated for many people
function DownloadTF2B() {
    $.get("https://api.github.com/repos/PazerOP/tf2_bot_detector/releases", function (data) {
        let jsonObject = data;
        let latestRelease = jsonObject[0];
        let latestAssets = latestRelease.assets;

        // Find correct zip file
        let downloadURL;
        for (let i = 0; i < latestAssets.length; i++) {
            let fileName = latestAssets[i].name;
            if (TF2B_FILE_REGEX.test(fileName)) {
                downloadURL = latestAssets[i].browser_download_url;
                break;
            }
        }

        if (downloadURL) {
            DownloadURLFile(downloadURL);
        }
    }).catch(function() {
        Swal.fire({
            title: "Error",
            html: "Connection to GitHub Api failed.<br/>You can still download TF2 Bot Detector manually:<br/><a href='https://github.com/PazerOP/tf2_bot_detector/releases' target='_blank'>View Releases</a>",
            icon: "error"
        });
    });
}