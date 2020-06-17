$(document).ready(function () {
    // Init Materialize

    // Load Home Page
    LoadPage("home");
});

// Use CORS Proxy for Ajax
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

function LoadPage(name) {
    $("#content").load("./pages/" + name + ".html", function () {
        InitPage();
    });
}

function InitPage() {
    M.AutoInit();
}