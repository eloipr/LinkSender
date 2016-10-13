/**
 * Created by eloipr on 12/10/16.
 */

var conn;
var peer = new Peer({key: 'lwjd5qra8257b9'});

document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector("#send");
    button.addEventListener("click", function() {
        /*var url = document.querySelector("#url").value;
        chrome.tabs.create({"url": url}, null);*/
        var destPeerId = document.querySelector("#url").value;
        conn = peer.connect(destPeerId);
    });
    var select = document.getElementById("deviceSelect");
    chrome.sessions.getDevices(null, function(devices) {
        for (var i = 0; i < devices.length; ++i) {
            var device = devices[i];
            console.log(device);
            //console.log(device.sessions[0]);
            var option = document.createElement("option");
            option.text = device.deviceName;
            option.value = device.deviceName;
            select.add(option);
        }
    });
    
    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
    });

    peer.on('connection', function(conn) {
        conn.on('open', function () {
            // Receive messages
            console.log("connection openetd");
            conn.on('data', function (data) {
                console.log('Received', data);
            });

            // Send messages
            conn.send('Hello!');
        });
    });




});

