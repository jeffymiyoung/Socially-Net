// Imports
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// specific user/thought routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export for External 
module.exports = router;