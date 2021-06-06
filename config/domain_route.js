let express = require('express');
let config = require('config');
let app = express();

let jsonRoute = require('json-routing');
let _ = require('underscore');
let modules = _.where(config.app.modules,{enable:true});

module.exports = () => {
	/******************api-versioning*********************/
	let routeInfo = {};
	for (let model of modules) {
		routeInfo = {
			routesPath	: './app/' + model.name + "/routes/v1/",
			controllersPath: './app/' + model.name + "/controllers/",
			policyPath: './app/auth/',
			cors: false
		}
		new jsonRoute.JsonRoute(app, routeInfo).start();
	}
	/*****************************************************/

	let domains = {
		'domains' : [
			{ 'domain_name' : config.get('app.issuer'), 'object' : app }
		]
	};
	return domains;
}
