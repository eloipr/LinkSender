var peer;

function destroyPeer() {
    if (peer) peer.destroy();
}

function createPeer(id) {
    peer = new Peer(id, {key: 'utolyaz0e75jyvi'});
    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
    });
}

function send(destPeerId, url) {
    var conn = peer.connect(destPeerId);

    conn.on('open', function() {
        // Receive messages
        console.log("connection opened");
        conn.on('data', function(data) {
            console.log('Received', data);
        });

        // Send messages
        conn.send('Hello!'); //url
    });
}

chrome.storage.local.get("id", function(result) {
    if (result.hasOwnProperty("id")) {
        createPeer(result.id);
        //chrome.storage.local.remove(["id", "friends"]);
        chrome.browserAction.setPopup({popup: "../html/popup.html"});
    }
    else {
        chrome.browserAction.setPopup({popup: "../html/setUp.html"});
    }
});

