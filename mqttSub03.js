require('dotenv').config()
let mqtt = require('mqtt')

let clientId = 'mqttSub033'

const host = process.env.MQTT_SERVER
// let host = 'mqtt://localhost:1883';

let options = {
	keepalive: 120,
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
		retain: false,
	},
}

let client = mqtt.connect(host, options)

client.on('connect', function () {
	console.log(`Connected: ${client.connected}`)

	client.subscribe('clientTest', { qos: 1 })
})

client.on('error', function (err) {
	console.log(err)
	client.end()
})

client.on('message', function (topic, message, packet) {
	console.log(`Topic: ${topic}: ${message}`)
})

client.on('offline', function () {
	console.log('offline')
})

client.on('reconnect', function () {
	console.log('reconnected: ', clientId)
	//  client.subscribe('clientTest', { qos: 1 });
})

client.on('close', function () {
	console.log(clientId + ' disconnected')
})
