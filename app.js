const express = require("express");
const app = express();
const nunjucks = require("nunjucks");

app.set("view engine", "html");
nunjucks.configure("views", {
  autoescape: true,
  express: app
});

var _ = require('lodash');
// var logger = require('../lib/logger');
// var log = logger();

var users = require('init_data.json').data;
var curId = _.size(users);

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/users", (req, res, next) => {
    res.json(_.toArray(users));
})

app.get("/dogs/:name", (req, res, next) => {
  res.render("dog", { name: req.params.name });
});

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

module.exports = app;
