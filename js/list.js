$(document).ready(function () {
    LoadList();
});

function LoadList() {
    $.get("https://lnx00.github.io/TF2-Bot-List/lists/botlist.txt", function(data) {
        let bots = data.split("\n");

        $("#botList").empty();
        for (let i = 0; i < bots.length; i++) {
            if (bots[i].startsWith("//")) { continue; }
            let botRow = "<li class='collection-item'>" + bots[i] + "</li>";
            $("#botList").append(botRow);
        }
    });
}