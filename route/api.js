var Joi = require('joi');

var apiTag = ['api'];

var basePath = '/api';

// Routes for APIs
// get all users
module.exports.routers = [
{
	method: 'GET',
	path: basePath + '/user',
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
},

// get a single user
{
	method: 'GET',
	path: basePath + '/user/{id}',
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
},

// Create user
{
	method: 'POST',
	path: basePath + '/user',
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
},

// Update a single user
{
	method: 'PUT',
	path: basePath + '/user/{id}',
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
},

{
	method: 'DELETE',
	path: basePath + '/user/{id}',
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
}
];


