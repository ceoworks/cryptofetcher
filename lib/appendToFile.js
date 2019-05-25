const {promisify} = require('util');
const fs = require('fs');
const _ = require('lodash');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

module.exports = async function append(storeFile, newData) {
	try {
		const fileData = await readFileAsync(storeFile, 'utf8');
	  let data = JSON.parse(fileData);
	  data = _.uniq(data.concat(newData));
	  json = JSON.stringify(data, null, 2);
	  const writeRes = await writeFileAsync(storeFile, json, 'utf8');
	} catch(e) {
		console.log(`Error, while writing to file '${storeFile}':`, e);
	}
};
