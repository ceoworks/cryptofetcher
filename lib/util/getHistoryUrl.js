module.exports = function getHistoryUrl(exchange, timeframe, ticker) {
	const historyUrlsMap = {
		bitfinex: `https://api.bitfinex.com/v2/candles/trade:${timeframe}:t${ticker}/hist`,
	};
	return historyUrlsMap[exchange];
};
