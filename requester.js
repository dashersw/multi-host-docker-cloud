var cote = require('cote');

var req = new cote.Requester({
    name: 'requester'
});

var id = Math.floor(Math.random() * 100);

setInterval(_ => {
    req.send({type: 'req', source: id, val: Math.floor(Math.random() * 100)}, _ => {
        console.log(`I am ${id}. response: ${_}`);
    });
}, 1000);
