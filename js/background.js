var peer;

function destroyPeer() {
    if (peer) peer.destroy();
}

function connect(c) {
    c.on("data", function(data) {
        console.log(data);
        c.close();
    });
    c.on("close", function() {
        console.log("conncection closed");
    })
}

function createPeer(id) {
    peer = new Peer(id, {key: 'utolyaz0e75jyvi'});
    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
    });
    peer.on('error', function(err) {
        console.log(err.type);
    });
    peer.on('connection', connect);
}

function send(destPeerId, url) {
    var c = peer.connect(destPeerId);
    c.on('open', function() {
        console.log("opened connection");
        connect(c);
        c.send(url);
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

