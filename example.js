'use strict'

const createHafasClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')
const createHealthCheck = require('.')

const hafasClient = createHafasClient(dbProfile, 'my-awesome-program')
const berlinHbf = '8011160'
const checkIfHealthy = createHealthCheck(hafasClient, berlinHbf)

checkIfHealthy()
.then((isHealthy) => {
	if (isHealthy) console.error('hafas-client instance is healthy.')
	else {
		console.error('hafas-client instance is not healthy!')
		process.exitCode = 1
	}
})
.catch((err) => { // something exceptional happend
	console.error(err)
	process.exitCode = 1
})
