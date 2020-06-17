function FindNewBots() {
    let txtInput = $("#inputField").val();
    let txtOutput = "";

    $.get("./lists/botlist.txt", function (data) {
        //let bots = data.split("\n");
        let bots = FileList(data);

        for (let i = 0; i < bots.length; i++) {
            let cBot = bots[i];
            if (cBot.startsWith("//") || !cBot) {
                continue;
            }

            txtInput = txtInput.replace(cBot, "");
            /*if (!txtInput.includes(cBot)) {
                txtOutput += cBot + "\n";
            }*/
        }
        txtInput = txtInput.replace(/^\s*$(?:\r\n?|\n)/gm, ""); // Remove all empty lines
        //txtInput = txtInput.replace(/^\D*$/g, ""); // Remove all non-ID lines

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