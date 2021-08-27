let mqtt = require('mqtt');

let clientId = 'mqttSub05';

// let host = 'mqtt://localhost:1883';
let host = 'mqtt://localhost:1883';

let options = {
  keepalive: 120,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: false,
  retain: false,
  reconnectPeriod: 1000 * 5,
  connectTimeout: 1000 * 60,
  will: {
    topic: 'WilllMsg',
    payload: `Subscriber ${clientId} Connection Closed abnormally..!`,
    qos: 1,
    retain: false
  }
};

let client = mqtt.connect(host);

client.on('error', function (err) {
  console.log(err);
  client.end();
});

client.on('connect', function () {
  console.log(`${clientId} connected`);
  client.subscribe('clientTest', { qos: 1 });
});

client.on('message', function (topic, message, packet) {
  console.log(`Rec'd ${message.toString()} On Topic: ${topic}`);
});

client.on('close', function () {
  console.log(`${clientId} disconnected`);
});
