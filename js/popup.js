/**
 * Created by eloipr on 12/10/16.
 */
var background = chrome.extension.getBackgroundPage();
var friends = [];
var conn;

$(document).ready(function () {
    //chrome.browserAction.setPopup({popup: "../html/popup.html"});
    chrome.storage.local.get("friends", function(result) {
        if (result.hasOwnProperty("friends")) {
            result.friends = friends;
            refreshFriends();
        }
    });



    background.peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
    });

    background.peer.on('connection', function(dconn) {
        dconn.on('open', function () {
            // Receive messages
            console.log("connection opened");
            dconn.on('data', function (data) {
                console.log('Received', data);
            });

            // Send messages
            dconn.send('Hello!');
        });
    })
    $("p").text("username: " + background.peer.id);

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
    });
});

function refreshFriends() {
    var select = $("#friends");
    select.empty();
    for (var i = 0; i < friends.length; i++) {
        select.append($("<option/>", {
            "text": friends[i],
            "value": friends[i]
        }));
    }
}
