$(document).ready(function () {
    // Init Materialize
    M.AutoInit();

    // Load Home Page
    LoadPage("home");
});

function LoadPage(name) {
    $("#content").load("./pages/" + name + ".html");
    //window.history.pushState("", "", "/" + name + ".html");
}