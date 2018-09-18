'use strict';

var mqtt = require('mqtt');

var clientId = 'mqttSub04';

var host = 'mqtt://192.168.0.101:1883';

var options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: false,
  retain: false,
  reconnectPeriod: 1000 * 3,
  connectTimeout: 1000 * 60,
  will: {
    topic: 'WilllMsg',
    payload: '%s Connection Closed abnormally..!',
    qos: 1,
    retain: false
  }
};

var client = mqtt.connect(host, options);

client.on('error', function (err) {
  console.log(err);
  client.end();
});

client.subscribe('clientTest', { qos: 1 });

client.on('connect', function () {
  console.log('client connected: ' + clientId);
});

client.on('message', function (topic, message, packet) {
  console.log('Rec\'d msg: ' + message.toString() + ' Topic: ' + topic);
});

client.on('close', function () {
  console.log(clientId + ' disconnected');
});
