
const {readdir} = require('fs').promises;
const {readFile} = require("fs").promises;
const envPath = './env/';

var currentConfig = {};

 async function getConfig(){
    const pathFile = envPath + 'config.json';
    const configFile = await readFile(pathFile, 'utf8');
    const config = JSON.parse(configFile);
    currentConfig = config;
    return (await config);

}

function getCurrentConfig(){
    return currentConfig;
}

module.exports = {getConfig, getCurrentConfig };

