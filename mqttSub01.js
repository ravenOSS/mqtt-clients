// 'use strict';

const mqtt = require('mqtt')

const clientId = 'mqttSub01'

const host = 'mqtt://192.168.0.128:1883'

const options = {
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
}

const client = mqtt.connect(host, options)

client.on('connect', function () {
  console.log('client connected :', clientId)
  client.subscribe('clientTest')
})

client.on('error', function (err) {
  console.log(err)
  client.end()
})

client.on('message', function (topic, message, packet) {
  console.log(`Received: `)
  console.log(message.toString())
})

client.on('offline', function () {
  console.log('offline')
})

client.on('close', function () {
  console.log(clientId + ' disconnected')
})

client.on('reconnect', function () {
  console.log('reconnected: ', clientId)
//  client.subscribe('clientTest', { qos: 1 });
})
