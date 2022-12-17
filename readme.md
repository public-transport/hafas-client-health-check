# hafas-client-health-check

A heuristic to **check if a [`hafas-client@5`](https://github.com/public-transport/hafas-client/tree/5)/[`hafas-client@6`](https://github.com/public-transport/hafas-client/tree/6) instance and the underlying HAFAS endpoint work.** It will query departures at a well-known station for the coming Monday 8am.

[![npm version](https://img.shields.io/npm/v/hafas-client-health-check.svg)](https://www.npmjs.com/package/hafas-client-health-check)
![ISC-licensed](https://img.shields.io/github/license/public-transport/hafas-client-health-check.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)


## Installation

```shell
npm install hafas-client-health-check
```


## Usage

```js
const createHafasClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')
const createHealthCheck = require('hafas-client-health-check')

const hafasClient = createHafasClient(dbProfile, 'my-awesome-program')
const berlinHbf = '8011160'
const checkIfHealthy = createHealthCheck(hafasClient, berlinHbf)

checkIfHealthy()
.then((isHealthy) => {
	if (isHealthy) console.error('hafas-client instance is healthy.')
	else console.error('hafas-client instance is not healthy!')
})
.catch((err) => { // something exceptional happend
	console.error(err)
	process.exitCode = 1
})
```


## Contributing

If you have a question or need support using `hafas-client-health-check`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/public-transport/hafas-client-health-check/issues).
