// Downloads a simple Text-File
function DownloadFile(filename, content) {
    let dlElement = document.createElement("a");
    dlElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    dlElement.setAttribute('download', filename);

    //dlElement.style.display = 'none';
    //document.body.appendChild(dlElement);

    dlElement.click();

    //document.body.removeChild(dlElement);
}

// Downloads a binary File
function DownloadBinFile(filename, data) {
    let bytes = new Uint8Array(data);

    let blob = new Blob([bytes], {
        type: "application/octet-stream"
    });

    let dlElement = document.createElement("a");
    dlElement.setAttribute("href", window.URL.createObjectURL(blob));
    dlElement.setAttribute("download", filename);
    dlElement.click();
}

// Checks if an id is valid
function IsValidID(id) {
    if (!id) { return false; }
    return (/^\d*$/).test(id);
}

// Checks if an Steam ID 3 is valid
function IsValidID3(id) {
    if (!id) { return false; }
    return (/\[U:1:\d*]/).test(id);
}

/*******************/
/*   CONVERSION   */
/******************/

// Converts SteamID3 to SteamID64
function ID3toID64(id) {
    let id64 = (BigInt(id.substring(5, id.length - 1)) + 76561197960265728n).toString();
    return id64;
}

// Converts SteamID64 to SteamID3
function ID64toID3(id64) {
    let id3 = "[U:1:" + (BigInt(id64) ^ 76561197960265728n).toString() + "]";
    return id3;
}

// Converts List to JSON
function ListToJSON(list) {
    if (!list) { return ""; };

    let jsonObject = new Object();
    let listLines = list.replace("\r", "").split("\n");

    let botArray = [];
    for (let i = 0; i < listLines.length; i++) {
        if (!IsValidID(listLines[i])) { continue; }
        let botItem = new Object();
        botItem.id = listLines[i];
        botArray.push(botItem);
    }

    jsonObject.botList = botArray;
    return JSON.stringify(jsonObject, null, 3);
}

// Converts List to TF2 Bot Detector
function ListToTF2B(list) {
    if (!list) { return ""; };

    let listLines = list.replace("\r", "").split("\n");
    let jsonObject = new Object();
    jsonObject.$schema = "./schema/playerlist.schema.json";
    jsonObject.version = 2;

    let players = [];
    for (let i = 0; i < listLines.length; i++) {
        let cID = listLines[i];
        if (cID.startsWith("//") || !cID) {
            continue;
        }

        let cPlayer = new Object;
        cPlayer.attributes = ["cheater"];
        cPlayer.steamid = ID64toID3(cID);
        players.push(cPlayer);
    }

    jsonObject.players = players;
    return JSON.stringify(jsonObject, null, 3);
}

// Converts List to TF2 Bot Detector
function JSONToTF2B(json) {
    if (!json) { return ""; }

    let jsonObject = JSON.parse(json);
    let tf2bObject = new Object();
    tf2bObject.$schema = "./schema/playerlist.schema.json";
    tf2bObject.version = 2;
    
    let players = [];
    for (let i = 0; i < jsonObject.botList.length; i++) {
        let cID = jsonObject.botList[i].id;
        if (!IsValidID(cID)) { continue; }

        let cPlayer = new Object;
        cPlayer.attributes = ["cheater"];
        cPlayer.steamid = ID64toID3(cID);
        players.push(cPlayer);
    }

    tf2bObject.players = players;
    return JSON.stringify(tf2bObject, null, 3);
}

// Converts TF2 Bot Detector to JSON
function TF2BToJSON(json) {
    if (!json) { return ""; }

    let tf2bObject = JSON.parse(json);
    let jsonObject = new Object();

    let botList = [];
    for (let i = 0; i < tf2bObject.players.length; i++) {
        let cID = tf2bObject.players[i].steamid;
        if (!IsValidID3(cID)) { continue; }

        let cPlayer = new Object;
        cPlayer.attributes = ["cheater"];
        cPlayer.steamid = ID3toID64(cID);
        botList.push(cPlayer);
    }

    jsonObject.botList = botList;
    return JSON.stringify(jsonObject, null, 3);
}

// Converts JSON to List
function JSONToList(json) {
    if (!json) { return ""; }

    let jsonObject = JSON.parse(json);
    let botList = "";
    for (let i = 0; i < jsonObject.botList.length; i++) {
        let cID = jsonObject.botList[i].id;
        if (!IsValidID(cID)) { continue; }

        botList += cID + "\n";
    }

    return botList.substring(botList.length - 1);
}

// Converts TF2 Bot Detector to List
function TF2BToList(json) {
    if (!json) { return ""; }

    let tf2bObject = JSON.parse(json);
    let botList = "";
    for (let i = 0; i < tf2bObject.players.length; i++) {
        let cID = tf2bObject.players[i].steamid;
        if (!IsValidID3(cID)) { continue; }

        botList += ID3toID64(cID) + "\n";
    }

    return botList.substring(botList.length - 1);
}