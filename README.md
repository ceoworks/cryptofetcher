# CryptoFetcher

Fetch historical data on Bitcoin and other cryptos on Bitfinex exchange (other exchanges to be added)

## Installation

`yarn install`

## Usage

`node index --timeframe 1h --storeFile btc_1h.json`

- `--timeframe` could be in `1m`, `5m`, `15m`, `30m`, `1h`, `2h`, `3h`, `6h`, `12h`, `1D`. (**Defaults** to `1D`)
- `--storeFile` name of the file (**Defaults** to `btc_data_test.json`)
