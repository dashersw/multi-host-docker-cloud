var dgram = require('dgram');
var socket = dgram.createSocket({type: 'udp4', reuseAddr: true });

var broadcastPort = process.env.BROADCAST_PORT || 12345;

socket.bind(broadcastPort);

socket.on('message', (data, rinfo) => {
    console.log(`Message received from ${rinfo.address}:${rinfo.port} > "${data}"`);
});
