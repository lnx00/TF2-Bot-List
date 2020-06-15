// Download simple Test-File
function DownloadFile(filename, content) {
    let dlElement = document.createElement("a");
    dlElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    dlElement.setAttribute('download', filename);

    //dlElement.style.display = 'none';
    //document.body.appendChild(dlElement);

    dlElement.click();

    //document.body.removeChild(dlElement);
}

// Download binary File
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

/*   CONVERSION   */

// Converts SteamID3 to SteamID64
function ID3toID64(id) {

}

// Converts SteamID64 to SteamID3
function ID64toID3(id64) {
    let id3 = "[U:1:" + (parseInt(id64) ^ 0x110000100000000).toString() + "]";
    return id3;
}

function ListToJSON(list) {

}

function ListToTF2A(list) {
    
}