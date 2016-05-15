module.exports.routers = [
{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('./index/home', {
        	title: 'Home Page',
        	message: 'Index - Home Page'
        });
    }
}
];