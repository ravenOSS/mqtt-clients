'use strict';

var mqtt = require('mqtt');

var clientId = 'wssSubB01';

var host = 'ws://192.168.0.101:8880';

var options = {
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
    qos: 0,
    retain: true
  }
};

var client = mqtt.connect(host, options);

client.on('connect', function () {
  console.log('client connected :', clientId);
  client.subscribe('clientTest', { qos: 1 });
});

client.on('error', function (err) {
  console.log(err);
  client.end();
});

client.on('message', function (topic, message, packet) {
  console.log('%s Rec: %s Topic: %s', clientId, message.toString(), topic);
});

client.on('offline', function () {
  console.log('offline');
});

client.on('reconnect', function () {
  console.log('reconnected: ', clientId);
//  client.subscribe('clientTest', { qos: 1 });
});

client.on('close', function () {
  console.log(clientId + ' disconnected');
});
