const darkMode = new Darkmode({
    saveInCookies: true,
    label: "💡",
    autoMatchOsTheme: false
});

$(document).ready(function () {
    // Load Home Page
    LoadPage("home");

    // Init Dark Mode
    darkMode.showWidget();
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