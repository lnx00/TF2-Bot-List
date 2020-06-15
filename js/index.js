$(document).ready(function () {
    // Init Materialize

    // Load Home Page
    LoadPage("home");
});

function LoadPage(name) {
    $("#content").load("./pages/" + name + ".html", function () {
        InitPage();
    });
    //window.history.pushState("", "", "/" + name + ".html");
}

function InitPage() {
    M.AutoInit();
}