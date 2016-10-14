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
    $("#ok").click(function(event) {
        var username = $("#user").val();
        chrome.storage.local.set({"id": username}, function(bytes){});
        //chrome.browserAction.setPopup({popup: "../html/popup.html"});
        background.peer.destroy();
        background.peer = new Peer(username, {key: 'utolyaz0e75jyvi'});
        window.location.href="../html/popup.html";
    });
});

