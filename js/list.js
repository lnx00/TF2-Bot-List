$(document).ready(function () {
    LoadList();
});

function LoadList() {
    $.get("./lists/botlist.txt", function(data) {
        let bots = data.split("\n");

        $("#botList").empty();
        for (let i = 0; i < bots.length; i++) {
            let cBot = bots[i];
            if (cBot.startsWith("//") || !cBot) { continue; }

            let botRow = `<li class="collection-item"><div>${cBot}<a href="https://steamcommunity.com/profiles/${cBot}" target="_blank" class="secondary-content"><i class="material-icons">launch</i></a></div></li>`;
            $("#botList").append(botRow);
        }
    });
}