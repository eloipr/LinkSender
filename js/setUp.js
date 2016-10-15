/**
 * Created by eloipr on 13/10/16.
 */
/*var button = $("#ok");
button.addEventListener("click", function() {
    var username = document.getElementById("#user").value;
    chrome.storage.local.set({"id": username}, function(bytes){});
    chrome.browserAction.setPopup({popup: "../html/popup.html"});
});*/
var background = chrome.extension.getBackgroundPage();

$(document).ready(function () {
    $("#ok").prop("disabled", true);
    $("#user").on("change paste keyup", function() {
        if ($(this).val()) $("#ok").prop("disabled", false);
        else $("#ok").prop("disabled", true);
    });
    $("#ok").click(function(event) {
        var username = $("#user").val();
        if (username != null) {
            chrome.storage.local.set({"id": username}, function (bytes) {});
            background.destroyPeer();
            background.createPeer(username);
            chrome.browserAction.setPopup({popup: "../html/popup.html"});
            window.location.href = "../html/popup.html";
        }
    });
});

