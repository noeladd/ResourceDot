'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/resources', require('./resources'));
router.use('/tags', require('./tags'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res, next) { //eslint-disable-line
    var err = new Error('Not found.');
    err.status = 404;
    next(err);
});
