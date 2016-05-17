# Hapi-Web-Starter-Project

This project was initially created for an API starter.

I have integrated several useful features to make it a powerful platform serves both API projects and web MVC projects.

To start the project: 
```js
> npm start

> node app.js
```

Additional features you may need:

1. MongoDB runs on localhost:27017
2. Solr (optional)

If you don't have MongoDB or Solr up and running, don't panic. Simply comment the below lines in app.js (For example, MongoDB is not working, comment out apiRouter as MongoDB is required for api related pages.)

```js
// allRouters = allRouters.concat(require('./route/api').routers);
allRouters = allRouters.concat(require('./route/index').routers);
allRouters = allRouters.concat(require('./route/static_content').routers);
allRouters = allRouters.concat(require('./route/solr').routers);
```

Hapi RESTful API with Hapi-Swagger

If you have got your MongoDB up and running, you will be able to browse your API page at:

```js
localhost:3000/documentation
```