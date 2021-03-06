const ID_REGEX = /(?=.)^\d*$/;
const ID3_REGEX = /\[U:1:\d*]/;
const BOT_LIST_URL = "https://gist.githubusercontent.com/wgetJane/0bc01bd46d7695362253c5a2fa49f2e9/raw";

// Downloads a simple Text-File
function DownloadFile(filename, content) {
    let dlElement = document.createElement("a");
    dlElement.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    dlElement.setAttribute("download", filename);
    dlElement.click();
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

// Download file from URL
function DownloadURLFile(url) {
    let dlElement = document.createElement("a");
    dlElement.setAttribute("href", url);
    dlElement.setAttribute("download", true);
    dlElement.click();
}

// Checks if an id is valid
function IsValidID(id) {
    if (!id) { return false; }
    return (ID_REGEX).test(id);
}

// Checks if an Steam ID 3 is valid
function IsValidID3(id) {
    if (!id) { return false; }
    return (ID3_REGEX).test(id);
}

// Filters a list and removes all non-ID lines
function FilterList(list) {
    if (!list) { return []; }
    let listArray = list.replace("\r", "").split("\n");
    let filteredList = listArray.filter(x => x.match(ID_REGEX));
    return filteredList;
}

/*******************/
/*   CONVERSION   */
/******************/

const TF2B_SHEMA = "https://raw.githubusercontent.com/PazerOP/tf2_bot_detector/master/schemas/v3/playerlist.schema.json";

// Created a string list of an Array
function ArrayToList(array) {
    if (!array) { return ""; }
    let retString = "";
    for (let i = 0; i < array.length; i++) {
        retString += array[i] + ((i < array.length - 1) ? "\n" : "");
    }
    return retString;
}

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
    //let listLines = list.replace("\r", "").split("\n");
    let listLines = FilterList(list);

    let botArray = [];
    for (let i = 0; i < listLines.length; i++) {
        if (!listLines[i]) { continue; }
        let botItem = new Object();
        botItem.id = listLines[i];
        botArray.push(botItem);
    }

    jsonObject.botList = botArray;
    return JSON.stringify(jsonObject, null, 3);
}

// Converts List to TF2 Bot Detector
function ListToTF2B(list, url = undefined) {
    if (!list) { return ""; };

    let listLines = FilterList(list);
    let jsonObject = new Object();
    jsonObject.$schema = TF2B_SHEMA;
    if (url) {
        jsonObject.file_info = {
            update_url: url
        };
    }

    let players = [];
    for (let i = 0; i < listLines.length; i++) {
        let cID = listLines[i];
        if (!cID) { continue; }

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
    tf2bObject.$schema = TF2B_SHEMA;
    
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
        cPlayer.id = ID3toID64(cID);
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

    return botList.substring(0, botList.length - 1);
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

    return botList.substring(0, botList.length - 1);
}