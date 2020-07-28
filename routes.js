/**
 * Routes
 */
const express = require('express');
const router = express.Router();

/**
 * Require Handlers & Controllers
 */
const { catchErrors } = require('./handlers/errorHandlers');
const pagesController = require('./controllers/pagesController');

/**
 * Page Routing
 */
router.get('/', catchErrors(pagesController.index));

// Export Router
module.exports = router;
