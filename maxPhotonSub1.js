let mqtt = require('mqtt');

let clientId = 'maxPhotonSub1';

let host = 'mqtt://192.168.0.103:1883';

let subscription = 'distance';

let options = {
  keepalive: 60, // seconds
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: false,
  retain: false,
  reconnectPeriod: 1000 * 3, // interval between two reconnections
  connectTimeout: 1000 * 60, // time to wait for a CONNACK
  will: {
    topic: 'WilllMsg',
    payload: `${clientId} Connection Closed abnormally..!`,
    qos: 1,
    retain: false
  }
};

let client = mqtt.connect(host, options);

client.on('connect', function () {
  console.log('client connected :', clientId);
  client.subscribe(subscription, { qos: 1 });
});


client.on('message', function (topic, message, packet) {
  console.log(`Rec'd: ${message} on Topic: ${topic}`);
});

client.on('error', function (err) {
  console.log(err);
  client.end();
});

client.on('offline', function () {
  console.log('offline');
});

client.on('close', function () {
  console.log(clientId + ' disconnected');
});

client.on('reconnect', function () {
  console.log('reconnected: ', clientId);
//  client.subscribe('clientTest', { qos: 1 });
});
