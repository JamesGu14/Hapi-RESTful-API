var Path = require('path');

module.exports.routers = [
	{
		method: 'GET',
		path: '/content/{params*}',
		handler: {
	      	directory: { 
	      		path: './content',
	      		listing: false
	      	}
	    }
	}
];

