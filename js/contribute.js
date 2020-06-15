function FindNewBots() {
    let txtInput = $("#inputField").val();

    $.get("./lists/botlist.txt", function (data) {
        let bots = data.split("\n");

        for (let i = 0; i < bots.length; i++) {
            let cBot = bots[i];
            if (cBot.startsWith("//") || !cBot) {
                continue;
            }

            txtInput = txtInput.replace(cBot, "");
        }
        txtInput = txtInput.replace(/^\s*$(?:\r\n?|\n)/gm, ""); // Remove all empty lines

        $("#inputField").val(txtInput);
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