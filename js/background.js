var peer;

chrome.storage.local.get("id", function(result) {
    if (result.hasOwnProperty("id")) {
        peer = new Peer(result.id, {key: 'utolyaz0e75jyvi'});
        //chrome.storage.local.remove(["id", "friends"]);
    }
    else {
        window.location.href="../html/setUp.html";
    }
});

