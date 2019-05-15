const request = require('request-promise');
const minimist = require('minimist');
const config = require('./config');
const append = require('./appendToFile');
const storeFile = './btc_data_test.json';

const flags = minimist(process.argv.slice(2));
console.log('flags:', flags);

let query = {
	start: config.bitfinex.genesisTimestamp,
	sort: 1,
	limit: config.bitfinex.maximumCandlesLimit,
};
let previousRequestCandleTime;

async function start() {
	const reqOps = {
		url: config.bitfinex.historyUrl,
		qs: query,
		json: true,
	};
	const result = await request.get(reqOps);
	const [latestCandleTime] = result[result.length - 1];
	console.log('latestCandleTime:', latestCandleTime);
	await append(storeFile, result);
	while (previousRequestCandleTime !== latestCandleTime) {
		query.start = latestCandleTime;
		previousRequestCandleTime = latestCandleTime;
		try {
			await start();
		} catch(e) {
			await new Promise((resolve) => setTimeout(resolve, 61 * 1000));
			await start();
		}
	}
};

start();
