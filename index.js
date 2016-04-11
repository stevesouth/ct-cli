var commands = require('./commands');
var args = require('minimist')(process.argv.slice(2));
var command = args._[0];
var option = args._[1];
var commandFunction = commands[command];

if (!command || !commandFunction) {
	console.log("Command '" + command + "' not found");
	commands['help'](option);
} else {
	commandFunction(option);
}



