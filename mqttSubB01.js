'use strict';

let mqtt = require('mqtt');

let mqttSubId = 'mqttSubB01';

let mqtturl = 'mqtt://localhost:2883';

let mqttoptions = {
  keepalive: 60,
  clientId: mqttSubId,
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
    retain: false
  }
};

let subscriptions = {'clientTest': 1};

  const mqttclient = mqtt.connect(mqtturl, mqttoptions);

  mqttclient.on('error', function (err) {
    console.log(err);
    mqttclient.end();
  });

mqttclient.on('connect', function () {
  console.log('%s mqtt client connected', mqttSubId);
});

mqttclient.subscribe({subscriptions, mqttSubId});

mqttclient.on('message', function (topic, message, packet) {
  console.log('%s Rec: %s Topic: %s', mqttSubId, message.toString(), topic);
});

mqttclient.on('offline', function () {
  console.log('offline');
});

// mqttclient.on('reconnect', function () {
//   console.log('reconnected: ', mqttSubId);
// });

mqttclient.on('close', function () {
  console.log(mqttSubId + ' disconnected');
});
