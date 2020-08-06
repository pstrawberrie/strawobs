/**
 * Routes
 */
const express = require('express');
const router = express.Router();

/**
 * Require Handlers & Controllers
 */
//const { catchErrors } = require('./handlers/errorHandlers');
const pagesController = require('./controllers/pagesController');

/**
 * Page Routing
 */
router.get('/scene/game', pagesController.sceneGameDefault);
router.get('/scene/code', pagesController.sceneCodeDefault);
router.get('/scene/lobby', pagesController.sceneLobbyDefault);

// Export Router
module.exports = router;
