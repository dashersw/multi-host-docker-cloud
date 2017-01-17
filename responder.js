var cote = require('cote');

var res = new cote.Responder({
    name: 'responder'
});

var id = Math.floor(Math.random() * 100);

res.on('req', (req, cb) => {
    console.log(`I am ${id}. Sending out ${req.val} for requester#${req.source}`);
    cb(`hello from ${id}: ack ${req.val}`);
});

res.on('added', console.log);
