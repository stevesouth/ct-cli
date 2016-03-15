const copy = require('copy-template-dir')
const path = require('path')
 
module.exports = function(template, target, vars) {
	var inDir = path.join(process.cwd(), 'templates', template);

	copy(inDir, target, vars, (err, createdFiles) => {
		console.log('in:' + inDir);
	  if (err) throw err
	  createdFiles.forEach(filePath => console.log(`Created ${filePath}`))
	  console.log('done!')
	});
};


