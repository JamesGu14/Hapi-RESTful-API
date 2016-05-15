module.exports.routers = [
	{
		method: 'GET',
		path: '/content',
		handler: function(request, reply) {
			reply.file('');
		}
	}
]