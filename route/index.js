'use strict'

var basePath = '/';

module.exports.routers = [
{
    method: 'GET',
    path: basePath,
    handler: function (request, reply) {
        reply.view('./index/home', {
        	title: 'Home Page',
        	message: 'Index - Home Page'
        });
    }
}
];