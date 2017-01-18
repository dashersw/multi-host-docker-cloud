var dgram = require('dgram');
var socket = dgram.createSocket({type: 'udp4', reuseAddr: true });

var multicastAddress = process.env.MULTICAST_ADDRESS || '239.1.1.1';
var multicastPort = process.env.MULTICAST_PORT || 12345;
var multicastInterface = process.env.MULTICAST_INTERFACE || require('os').networkInterfaces().ethwe1[0].address;

socket.bind(multicastPort, _ => {
    socket.addMembership(multicastAddress, multicastInterface);
});

socket.on('message', (data, rinfo) => {
    console.log(`Message received from ${rinfo.address}:${rinfo.port} > "${data}"`);
});
