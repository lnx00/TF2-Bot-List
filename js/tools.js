function FindNewBots() {
    let txtInput = $("#inputField").val();
    let botList = FilterList(txtInput);
    let txtOutput = "";

    $.get(BOT_LIST_URL, function (data) {
        let dlBotList = FilterList(data);
        let diffArray = botList.filter(x => !dlBotList.includes(x));
        $("#inputField").val(ArrayToList(diffArray));
    });
}

function ConvertListToJSON() {
    let txtInput = $("#inputField").val();
    $("#inputField").val(ListToJSON(txtInput));
}

function ConvertListToTF2B() {
    let txtInput = $("#inputField").val();
    $("#inputField").val(ListToTF2B(txtInput));
}

function ConvertJSONToTF2B() {
    let txtInput = $("#inputField").val();
    $("#inputField").val(JSONToTF2B(txtInput));
}

function ConvertTF2BToJSON() {
    let txtInput = $("#inputField").val();
    $("#inputField").val(TF2BToJSON(txtInput));
}

function ConvertTF2BToList() {
    let txtInput = $("#inputField").val();
    $("#inputField").val(TF2BToList(txtInput));
}

function ConvertJSONToList() {
    let txtInput = $("#inputField").val();
    $("#inputField").val(JSONToList(txtInput));
}

function UpdateShema() {
    let txtInput = $("#inputField").val();
    $("#inputField").val(JSONToTF2B(TF2BToJSON(txtInput))); // This doesn't work and I don't know why...
}