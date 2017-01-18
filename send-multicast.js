var dgram = require('dgram');
var socket = dgram.createSocket({type: 'udp4', reuseAddr: true });

var id = Math.floor(Math.random() * 100);
var testMessage = `[hello world] id: ${id}`;
var multicastAddress = process.env.MULTICAST_ADDRESS || '239.1.1.1';
var multicastPort = process.env.MULTICAST_PORT || 12345;
var multicastInterface = process.env.MULTICAST_INTERFACE || require('os').networkInterfaces().ethwe1[0].address;

socket.bind(null, multicastInterface, _ => {
    socket.addMembership(multicastAddress, multicastInterface);
    socket.setMulticastTTL(255);
});

setInterval(_ => {
    socket.send(testMessage,
        0,
        testMessage.length,
        multicastPort,
        multicastAddress,
        err => {
            if (err) return console.log(err);

            console.log(`Message sent: "${testMessage}"`);
        }
    );
}, 3000);
