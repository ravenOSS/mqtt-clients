const mqtt = require('mqtt');

const clientId = 'mqttPub03';

const host = 'mqtt://localhost:1883';

let options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: false,
  retain: true,
  reconnectPeriod: 1000 * 5,
  connectTimeout: 1000 * 30,
  will: {
    topic: 'WillMsg',
    payload: `Publisher ${clientId} connection Closed abnormally..!`,
    qos: 1,
    retain: false
  }
};

let client = mqtt.connect(host, options);

client.on('error', function (err) {
  console.log(err);
  client.end();
});

client.on('connect', function () {
  console.log(`${clientId} connected`);
});

setInterval(function () {
  let date = new Date();
  let presentTime = date.getSeconds();
  // let msg = presentTime;
  let msg = presentTime.toString();

  client.publish('clientTest', msg, { qos: 1, retain: true });
  console.log(clientId, msg);
}, 1000 * 3);

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic);
});

client.on('close', function () {
  console.log(clientId + ' disconnected');
});
