const oneSecond = 1000;

module.exports = {
	bitfinex: {
		genesisTimestamp: 1364688000000,
		maximumCandlesLimit: 1000,
	},
	oneHourInMs: 3600 * oneSecond,
	defaultExchange: 'bitfinex',
	defaultTicker: 'BTCUSD',
	defaultTimeframe: '1D',
	rateLimitTimeout: 61 * oneSecond,
};
