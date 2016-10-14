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
}

function setListeners() {
    $("#friendName").on("change paste keyup", function() {
        if ($(this).val()) $("#addFriend").prop("disabled", false);
        else $("#addFriend").prop("disabled", true);
    });
    $("#send").click(function(event) {
        var destPeerId = $("select").val();
        background.send(destPeerId, null);
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
    $("#addFriend").prop("disabled", true);
    $("#send").prop("disabled", true);
    setListeners();

    chrome.storage.local.get([ "id", "friends" ], function(result) {
        if (result.hasOwnProperty("friends")) {
            friends = result.friends;
            refreshFriends();
        }
        if (result.hasOwnProperty("id")) {
            $("p").text("username: " + result.id);
        }
    });


});
