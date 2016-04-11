var path = require('path');
var copyTemplate = require('./copyTemplate');

module.exports = {
	'help': function() {
		require('./commands/help')();
	},
	'version': function() {
		
	},
	'init': function() {
		
	},
	'list': function() {
		
	},
	'create': function(type, name, options) {
		copyTemplate('app', path.join(process.cwd(), 'apps', appName), {
			appName: appName
		})
	}
};