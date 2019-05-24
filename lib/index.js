const request = require('request-promise');
const minimist = require('minimist');
const config = require('./config');
const append = require('./appendToFile');
const getHistoryUrl = require('./util/getHistoryUrl');

const flags = minimist(process.argv.slice(2));
console.log('flags:', flags);

let query = {
	start: config.bitfinex.genesisTimestamp,
	sort: 1,
	limit: config.bitfinex.maximumCandlesLimit,
};
let previousRequestCandleTime;

async function start() {
	const exchange = flags.exchange || config.defaultExchange;
	const timeframe = flags.timeframe || config.defaultTimeframe;
	const ticker = flags.ticker || config.defaultTicker;
	const storeFile = flags.storeFile || config.defaultStoreFile;
	const reqOps = {
		url: getHistoryUrl(exchange, timeframe, ticker),
		qs: query,
		json: true,
	};
	const result = await request.get(reqOps);
	const [latestCandleTime] = result[result.length - 1];
	await append(storeFile, result);
	while (previousRequestCandleTime !== latestCandleTime) {
		query.start = latestCandleTime;
		previousRequestCandleTime = latestCandleTime;
		try {
			await start();
		} catch(e) {
			await new Promise((resolve) => setTimeout(resolve, config.rateLimitTimeout));
			await start();
		}
	}
	console.log('Import completed!');
	process.exit();
};

start();
