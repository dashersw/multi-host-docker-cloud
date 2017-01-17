var dgram = require('dgram');
var socket = dgram.createSocket({type: 'udp4', reuseAddr: true });

var id = Math.floor(Math.random() * 100);
var testMessage = `[hello world] id: ${id}`;
var broadcastAddress = process.env.BROADCAST_ADDRESS || '255.255.255.255';
var broadcastPort = process.env.BROADCAST_PORT || 12345;

socket.bind(_ => {
    socket.setBroadcast(true);
});

setInterval(_ => {
    socket.send(testMessage,
        0,
        testMessage.length,
        broadcastPort,
        broadcastAddress,
        err => {
            if (err) return console.log(err);

            console.log(`Message sent: "${testMessage}"`);
        }
    );
}, 3000);
