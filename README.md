# mqtt-clients
Simple mqtt clients for testing mqtt brokers. Based upon mqtt.js NPM package.
There are websocket (wss) and mqtt clients. 
Two versions are provided: one for a first computer (could be machine hosting mqtt broker) and second is for different computer (filename<B>version.js). This allows testing of network interruptions (wifi, ethernet, etc).

Of course, all can be run on one machine. We have avoided using localhost for host parameter and instead use IP addresses to encourage consideration of wider deployments. Change according to your local network settings.
To replicate clients change the filename and clientId parameter so that it is unique.

TODO
Add authentication settings to clients and broker.
Create browser client.