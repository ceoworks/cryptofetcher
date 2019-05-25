function getDefaultStoreFileName(exchange, timeframe, ticker) {
	return `${exchange}_${ticker}_${timeframe}.json`;
}

module.exports = getDefaultStoreFileName;
