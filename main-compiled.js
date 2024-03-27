"use strict";

var jsonServer = require('json-server');
var queryString = require('query-string');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
server.use(middlewares);
server.get('/echo', function (req, res) {
  res.jsonp(req.query);
});
server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }
  next();
});
router.render = function (req, res) {
  // Check GET with pagination
  // If yes,custom output
  var headers = res.getHeaders();
  var totalCountHeader = headers['x-total-count'];
  if (req.method === 'GET' && totalCountHeader) {
    // const queryParams = queryString.parse(req._parsedUrl.query)
    var result = {
      data: res.locals.data,
      pagination: {}
    };
    return res.jsonp(result);
  }
  // Otherwise, keep default output
  res.jsonp(res.locals.data);
};
server.use('/api', router);
server.listen(3000, function () {
  console.log('JSON Server is running on port 3000');
});
