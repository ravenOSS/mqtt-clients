'use strict'
require('dotenv').config()
let mqtt = require('mqtt')

let clientId = 'mqttPub02'

const host = process.env.MQTT_SERVER
// var host = 'mqtt://192.168.0.130:1883'

let options = {
	keepalive: 60,
	clientId: clientId,
	protocolId: 'MQTT',
	protocolVersion: 4,
	clean: false,
	reconnectPeriod: 1000 * 5, // interval between two reconnections
	connectTimeout: 1000 * 60 * 3, // time to wait for a CONNACK
	retain: true,
	will: {
		topic: 'WillMsg',
		payload: 'Publisher connection Closed abnormally..!',
		qos: 1,
		retain: false,
	},
}

let client = mqtt.connect(host, options)

client.on('error', function (err) {
	console.log(err)
	client.end()
})

client.on('connect', function () {
	console.log('client connected:' + clientId)
})

setInterval(function () {
	const d = new Date()
	let msg = d.toString()
	client.publish('clientTest', msg, { qos: 1, retain: false })
	console.log(clientId, msg)
}, 5000)

client.on('message', function (topic, message, packet) {
	console.log(
		'Received Message:= ' + message.toString() + '\nOn topic:= ' + topic
	)
})

client.on('close', function () {
	console.log(clientId + ' disconnected')
})
