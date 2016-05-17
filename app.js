'use strict'

// include hapi package
var Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to local database
var sys_userModel = require('./model/sys_user');
var colors = require('colors');
var Path = require('path');

// create server object
var server = new Hapi.Server();

server.connection({port: 3000});

// Register Swagger Plugin.
const options = {
	info: {
		'title': 'Test API Documentation',
		'version': '0.0.4'
	}
};

server.register([
	Inert, 
	Vision,
	{
		'register': require('hapi-swagger'),
		'options': options
	}], (err) => {
		// View template as EJS
		server.views({
			engines: { ejs: require('ejs') },
	        relativeTo: __dirname,
	        path: 'view'
		});

		// API Documentation Page
		server.start((err => {
			if (err) {
                console.log(err);
            } else {
                console.log('Server running at:', server.info.uri);
            }
		}))
	});

// Register all routers.
var allRouters = [];
allRouters = allRouters.concat(require('./route/api').routers);
allRouters = allRouters.concat(require('./route/index').routers);
allRouters = allRouters.concat(require('./route/static_content').routers);
allRouters = allRouters.concat(require('./route/solr').routers);


for(var _route in allRouters) {
	server.route(allRouters[_route]);
}

















