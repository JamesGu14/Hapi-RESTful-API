'use strict'

// include hapi package
var Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
var Joi = require('joi');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to local database
var sys_userModel = require('./model/sys_user');

let apiTag = ['api'];

// create server object
var server = new Hapi.Server();

server.connection({port: 3000});

// Register Swagger Plugin.
const options = {
	info: {
		'title': 'Test API Documentation',
		'version': '0.0.1'
	}
};

server.register([
	Inert, 
	Vision,
	{
		'register': require('hapi-swagger'),
		'options': options
	}], (err) => {
		server.start((err => {
			if (err) {
                console.log(err);
            } else {
                console.log('Server running at:', server.info.uri);
            }
		}))
	});

// Routes for APIs
// get all users
server.route({
	method: 'GET',
	path: '/api/user',
	config: {
		tags: apiTag,
		description: 'Get All User Data',
		notes: 'Get All User Data'
	},
	handler: function(request, reply) {
		sys_userModel.find({}, function(err, data) {
			if(err) {
				reply({
					statusCode: 503,
					message: 'Connection failed',
					data: error
				});
			} else {
				reply({
					statusCode: 200,
					message: 'User data retrieving successfully',
					data: data
				});
			}
		});
	}
});

// get a single user
server.route({
	method: 'GET',
	path: '/api/user/{id}',
	config: {
		tags: apiTag,
		description: 'Get a specific user',
		notes: 'Get a specific user',
		validate: {
			// Id is required field
			params: {
				id: Joi.string().required()
			}
		}
	},
	handler: function(request, reply) {
		sys_userModel.find({_id: request.params.id}, function(err, data) {
			if(err) {
				reply({
					statusCode: 503,
                    message: 'Failed to get data',
                    data: err
				});
			} else {
				if(data.length === 0) {
					reply({
						statusCode: 200,
                        message: 'User Not Found',
                        data: data
					});
				} else {
					reply({
						statusCode: 200,
                        message: 'User Data Successfully Fetched',
                        data: data
					});
				}
			}
		})
	}
});

// Create user
server.route({
	method: 'POST',
	path: '/api/user',
	config: {
		tags: apiTag,
		description: 'Save single user data',
		notes: ' save a single user data',
		validate: {
			payload: {
				name: Joi.string(),
				email: Joi.string().email(),
				password: Joi.string(),
				gender: Joi.string()
			}
		}
	},
	handler: function(request, reply) {
		var newUser = new sys_userModel(request.payload);
		newUser.save(function(err) {
			if(err) {
				reply({
					statusCode: 503,
					message: 'User Creation failed',
					data: err
				});
			} else {
				reply({
					statusCode: 201,
					message: 'User saved successfully'
				});
			}
		});
	}
});

// Update a single user
server.route({
	method: 'PUT',
	path: '/api/user/{id}',
	config: {
		tags: apiTag,
		description: 'Update a specific user data',
		notes: 'Update a specific user data',
		validate: {
			params: {
				id: Joi.string().required()
			},
			payload: {
				name: Joi.string(),
				email: Joi.string().email(),
				password: Joi.string(),
				gender: Joi.string()
			}
		},
		handler: function(request, reply) {
			sys_userModel.findOneAndUpdate({_id: request.params.id}, request.payload, function(err, data) {
				if(err) {
					reply( {
						statusCode: 503,
						message: err
					});
				} else {
					reply({
						statusCode: 200,
						message: 'user updated successfully',
						data: data
					});
				}
			})
		}
	}
});

server.route({
	method: 'DELETE',
	path: '/api/user/{id}',
	config: {
		tags: apiTag,
		description: 'Remove a specific user data',
		notes: 'Remove specific user',
		validate: {
			params: {
				id: Joi.string().required()
			}
		}
	},
	handler: function(request, reply) {
		sys_userModel.findOneAndRemove({_id: request.params.id}, function(err) {
			if(err) {
				reply({
					statusCode: 503, 
					message: 'Failed to delete',
					data: error
				});
			} else {
				reply({
					statusCode: 200,
					message: 'Successfully deleted',
				})
			}
		})
	}
});


// Start server
// server.start(function() {
// 	console.log('Server starting at: ' + server.info.uri);
// });
