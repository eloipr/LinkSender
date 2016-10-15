/**
 * Created by eloipr on 12/10/16.
 */
var background = chrome.extension.getBackgroundPage();
var friends = [];

function refreshFriends() {
    var select = $("#friends");
    select.empty();
    for (var i = 0; i < friends.length; i++) {
        select.append($("<option/>", {
            "text": friends[i],
            "value": friends[i]
        }));
    }
    if (select.val()) $("#send").prop("disabled", false);
    else $("#send").prop("disabled", true);
    $('#friends').material_select();

}

function setListeners() {
    $("#friendName").on("change paste keyup", function() {
        if ($(this).val()) $("#addFriend").prop("disabled", false);
        else $("#addFriend").prop("disabled", true);
    });
    $("#send").click(function(event) {
        var destPeerId = $("select").val();
        var url = "";
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            url = tabs[0].url;
            background.send(destPeerId, url);
        });
    });

    $("#changeUser").click(function(event) {
        window.location.href="../html/setUp.html";
    });

    $("#addFriend").click(function(event) {
        var friend = $("#friendName").val();
        $("#friendName").val("");
        if (friend != null) {
            friends.push(friend);
            chrome.storage.local.set({"friends": friends}, function(bytes){});
            refreshFriends();
        }
        $(this).prop("disabled", true);
    });

}

$(document).ready(function () {
    $('#friends').material_select();
    $("#addFriend").prop("disabled", true);
    $("#send").prop("disabled", true);
    setListeners();

    chrome.storage.local.get([ "id", "friends" ], function(result) {
        if (result.hasOwnProperty("friends")) {
            friends = result.friends;
            refreshFriends();
        }
        if (result.hasOwnProperty("id")) {
            var text = "username: " + result.id;
            var userTag = $("<div/>", {
                "id": "userTag",
                "class": "card-panel teal lighten-2"
            });
            userTag.append("<span>" + text + "</span>");
            $("body").prepend(userTag);
        }
    });


});
