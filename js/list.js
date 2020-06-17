$(document).ready(function () {
    LoadList();
});

function LoadList() {
    $("#progressBar").show();
    $.get("https://gist.githubusercontent.com/wgetJane/0bc01bd46d7695362253c5a2fa49f2e9/raw", function(data) {
        let bots = FilterList(data);

        $("#botList").empty();
        for (let i = 0; i < bots.length; i++) {
            let cBot = bots[i];
            if (cBot.startsWith("//") || !cBot) { continue; }

            let botRow = `<li class="collection-item"><div>${cBot}<a href="https://steamcommunity.com/profiles/${cBot}" target="_blank" class="secondary-content"><i class="material-icons">launch</i></a></div></li>`;
            $("#botList").append(botRow);
        }
        $("#progressBar").hide();
    }).catch(function () {
        $("#progressBar").hide();
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load bot list!"
        });
    });
}