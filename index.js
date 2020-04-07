'use strict'

const {IANAZone, DateTime} = require('luxon')

const isNonEmptyString = str => 'string' === typeof str && !!str

const defaultHafasOpts = {
	// https://github.com/derhuerst/cached-hafas-client/blob/c6a990d45dfab141870263e95f7ec7bdd49b3241/readme.md#bypassing-the-cache
	[Symbol.for('cached-hafas-client:cached')]: false,
	duration: 5,
	remarks: false,
}

const createHealthCheck = (hafas, stationId, hafasOpts = defaultHafasOpts) => {
	if (!hafas || 'function' !== typeof hafas.departures || !hafas.profile) {
		throw new Error('missing or invalid hafas-client instance')
	}
	if (!isNonEmptyString(hafas.profile.timezone)) {
		throw new Error('missing or empty hafas.profile.timezone')
	}
	if (!isNonEmptyString(stationId)) {
		throw new Error('missing or empty station ID')
	}
	try {
		const opt = Object.assign({}, hafasOpts)
		opt.when = new Date()
		hafas.departures(stationId, opt).catch(() => {}) // silence rejections
	} catch (originalError) {
		const err = new Error('hafas.departures(stationId) throws')
		err.originalError = originalError
		throw err
	}

	// this is expensive, so we only do it once
	const zone = new IANAZone(hafas.profile.timezone)

	const checkIfHealthy = () => {
		const opt = Object.assign({}, hafasOpts)
		opt.when = DateTime.fromMillis(Date.now(), {zone})
		.startOf('week')
		.plus({weeks: 1, hours: 8}) // todo: don't assume `monday === 1`
		.toJSDate()

		return hafas.departures(stationId, opt)
		.then(deps =>  deps.length > 0)
	}
	return checkIfHealthy
}

module.exports = createHealthCheck
