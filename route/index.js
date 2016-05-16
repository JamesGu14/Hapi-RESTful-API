'use strict'

var basePath = '/';
var log = require('senso-logger');

module.exports.routers = [
{
    method: 'GET',
    path: basePath,
    handler: function (request, reply) {
    	log('Today is a happy day');
        reply.view('./index/home', {
        	title: 'Home Page',
        	message: 'Index - Home Page'
        });
    }
}
];