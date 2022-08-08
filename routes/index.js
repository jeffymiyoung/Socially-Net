// Imports / Declarations
const router = require('express').Router();
const apiRoutes = require('./api/');

// Routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
})

// Export for External
module.exports = router;