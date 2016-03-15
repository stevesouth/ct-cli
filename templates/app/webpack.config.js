import {join} from 'path';
import {readdirSync} from 'fs';
import path from 'path';

// Some thirdparty libraries use global `this` to reference `window`. webpack replaces such references to
// `this` with `undefined` when it wraps those modules. To load them without error you will therefore
// need to inject a reference to `window`. This can be done with the `imports-loader`.
function moduleUsesGlobal(absolutePath) {
	return absolutePath.match(/MutationObservers/) || absolutePath.match(/CustomElements/);
}

// Some thirdparty library modules check if `module` exists so they can export themself using it as
// opposed to attaching to the global. The way BRJS loaded them they didn't have access to `module` so to
// simulate a similar environment we need to remove `module`.
function moduleCannotBelieveItsACJSModule(absolutePath) {
	return absolutePath.match(/browser-modules/);
}

const appEntryPoint = join(__dirname, './entry.js');
const buildOutputDir = join(__dirname, 'static');
const webpackConfig = {
	entry: appEntryPoint,
	output: {
		path: buildOutputDir,
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	module: {
		loaders: [{
			test: /\.html$/,
			loaders: ['dom-loader', 'html-loader']
		}, {
			test: /\.(jpg|png|svg|woff)$/,
			loader: 'file-loader'
		}, {
			test: /\.js$/,
			loaders: ['babel-loader?cacheDirectory']
		}, {
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: moduleUsesGlobal,
			loader: 'imports-loader?this=>window'
		}, {
			test: moduleCannotBelieveItsACJSModule,
			loader: 'imports-loader?module=>undefined'
		}]
	}
};

export default webpackConfig;