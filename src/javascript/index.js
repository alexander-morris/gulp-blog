// index.js

var IPFS = require('ipfs')
var node = IPFS.create()

init();

function init () {
	console.log('init ran: Hello Alex!')
}