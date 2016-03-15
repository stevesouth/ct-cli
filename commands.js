var path = require('path');
var copyTemplate = require('./copyTemplate');

module.exports = {
	'create-app': function(appName) {
		copyTemplate('app', path.join(process.cwd(), 'apps', appName), {
			appName: appName
		})
	}
};