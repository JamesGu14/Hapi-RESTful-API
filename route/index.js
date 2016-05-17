'use strict'

var routerPath = '/';
var log = require('senso-logger');

module.exports.routers = [
{
    method: 'GET',
    path: routerPath,
    handler: function (request, reply) {
    	log('Today is a happy day');
        reply.view('./index/home', {
        	title: 'Home Page',
        	message: 'Index - Home Page'
        });
    }
}
];