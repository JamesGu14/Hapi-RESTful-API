'use strict'

var routerPath = '/solr';

module.exports.routers = [
{
	method: 'GET',
	path: routerPath + '/query1',
	handler: function(request, reply) {
		http.get('http://localhost:8983/solr/gettingstarted/select?indent=on&q=id:%220805080481%22&wt=json', (res) => {
			console.log('Got Response: ${res.statusCode}');
			res.resume();
		}).on('error', (err) => {
			console.log('Got error: ${err.message}');
		});
	}
}
];











