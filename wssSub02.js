'use strict';

let mqtt = require('mqtt');

let clientId = 'wssSub02';

let host = 'ws://192.168.0.101:8880';

let options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: false,
  retain: false,
  reconnectPeriod: 1000 * 3,
  connectTimeout: 1000 * 30,
  will: {
    topic: 'WilllMsg',
    payload: 'Subscriber Connection Closed abnormally..!',
    qos: 1,
    retain: false
  }
};

let client = mqtt.connect(host, options);

client.on('error', function (err) {
  console.log(err);
  client.end();
});

client.subscribe('clientTest', { qos: 1 });

client.on('connect', function () {
  console.log('client connected: ' + clientId);
});

client.on('message', function (topic, message, packet) {
  console.log('Received Message: ' + message.toString() + ' On topic: ' + topic);
});

client.on('reconnect', function () {
  console.log('reconnected: ', clientId);
  client.subscribe('clientTest', { qos: 1 });
});

client.on('close', function () {
  console.log(clientId + ' disconnected');
});
