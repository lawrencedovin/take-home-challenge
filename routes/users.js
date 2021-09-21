const express = require('express');

var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

var users = require('../init_data.json').data;
var curId = _.size(users);

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(_.toArray(users));
});

/* GET users listing. */
router.get('/admin', function(req, res) {
  res.render('admin');
});

router.get("/dogs/:name", (req, res, next) => {
  res.render("dog", { name: req.params.name });
});

/* Create a new user */
router.post('/', async (req, res, next) => {
  try {
    let user = req.body;
    user.id = curId++;
    if (!user.state) {
      user.state = 'pending';
    }
    users[user.id] = user;
    log.info('Created user', user);
    // res.send(`Thanks for signing up! ${user.firstName} ${user.lastName}`)
    res.redirect('/users');
    // res.json(user);
    // Confirm that user was created in redirected page.
  }
  catch(e) {
    return next(e);
  }
});

/* Get a specific user by id */
router.get('/:id', function(req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  res.json(users[req.params.id]);
});

/* Delete a user by id */
router.delete('/:id', function(req, res) {
  var user = users[req.params.id];
  delete users[req.params.id];
  res.status(204);
  log.info('Deleted user', user);
  res.json(user);
});

/* Update a user by id */
router.put('/:id', function(req, res, next) {
  var user = req.body;
  if (user.id != req.params.id) {
    return next(new Error('ID paramter does not match body'));
  }
  users[user.id] = user;
  log.info('Updating user', user);
  res.json(user);
});

















// /* GET users listing. */
// router.get('/', function(req, res) {
//   res.json(_.toArray(users));

// });

// /* Create a new user */
// router.post('/', async (req, res, next) => {
//   try {
//     let user = req.body;
//     user.id = curId++;
//     if (!user.state) {
//       user.state = 'pending';
//     }
//     users[user.id] = user;
//     log.info('Created user', user);
//     // res.send(`Thanks for signing up! ${user.firstName} ${user.lastName}`)
//     res.redirect('/users');
//     // res.json(user);
//     // Confirm that user was created in redirected page.
//   }
//   catch(e) {
//     return next(e);
//   }
// });

// /* Get a specific user by id */
// router.get('/:id', function(req, res, next) {
//   var user = users[req.params.id];
//   if (!user) {
//     return next();
//   }
//   res.json(users[req.params.id]);
// });

// /* Delete a user by id */
// router.delete('/:id', function(req, res) {
//   var user = users[req.params.id];
//   delete users[req.params.id];
//   res.status(204);
//   log.info('Deleted user', user);
//   res.json(user);
// });

// /* Update a user by id */
// router.put('/:id', function(req, res, next) {
//   var user = req.body;
//   if (user.id != req.params.id) {
//     return next(new Error('ID paramter does not match body'));
//   }
//   users[user.id] = user;
//   log.info('Updating user', user);
//   res.json(user);
// });


module.exports = router;
