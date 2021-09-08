require('dotenv').config()
const mqtt = require('mqtt')

const clientId = 'mqttSub011'
const host = process.env.MQTT_SERVER
const topic1 = process.env.TOPIC1

// const host = 'mqtt://192.168.0.128:1883'

const options = {
	keepalive: 60, // seconds
	clientId: clientId,
	protocolId: 'MQTT',
	protocolVersion: 4,
	clean: false,
	retain: false,
	reconnectPeriod: 1000 * 5, // interval between two reconnections
	connectTimeout: 1000 * 60 * 3, // time to wait for a CONNACK
	will: {
		topic: 'WilllMsg',
		payload: `${clientId} Connection Closed abnormally..!`,
		qos: 1,
		retain: false,
	},
}

const client = mqtt.connect(host, options)

client.on('connect', function () {
	console.log(`Connected: ${client.connected}`)
	client.subscribe(topic1, { qos: 1 })
	client.subscribe('distance', function (err, granted) {
		if (err) {
			console.log(`Subscribe Error: ${err}`)
		}
	})
})

client.on('message', function (topic, message, packet) {
	console.log(`${topic}: ${message}`)
})

client.on('error', function (err) {
	console.log(`Connection Error: ${err}`)
	client.end()
})

client.on('offline', function () {
	console.log('offline')
})

client.on('close', function () {
	console.log(clientId + ' disconnected')
})

client.on('reconnect', function () {
	console.log('reconnected: ', clientId)
})
