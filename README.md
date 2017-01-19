# multi-host-docker-cloud

## Setup
Create two machines on docker cloud, e.g.:
```sh
$ docker-cloud nodecluster create multi-host digitalocean fra1 512mb -t 2
```

Create a new stack on docker cloud:
```sh
$ docker-cloud up -f docker-cloud.yml -n multi-host
```

Log the send-multicast service:
```sh
$ docker-cloud service logs -f send-multicast
```

Log one of the receive-multicast containers:
```sh
$ docker-cloud container logs -f receive-multicast-1
```

If `receive-multicast-1` logs indicate that it can receive multicast messages
sent from all `send-multicast` containers, then it means multi-host multicast
is working.

## What works and what does not
To send a multicast package, the socket must be bound to the multicast
interface, in this case, weave network. So we have to find weave interface's
address. Unfortunately, '0.0.0.0' doesn't work.

To receive a multicast package, the socket must be bound to '0.0.0.0' interface.
Unfortunately, binding to weave interface doesn't work.

If both the sender and the receiver bind and join membership on '0.0.0.0',
multicast only works within a single host; so services on the other host can't
receive these messages.

## How should it work?
Normally, multicast shouldn't require binding to a specific interface (Weave,
in this case.) Binding to '0.0.0.0' and joining membership there, should work.
The operating system should be responsible for picking the right interface.
