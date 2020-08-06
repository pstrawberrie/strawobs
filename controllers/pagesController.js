/**
 * Pages Controller
 */
const codeInfo = require('../code.json');

// GET scene-game-default
exports.sceneGameDefault = async (req, res) => {
    res.render('scene-game-default');
}

// GET scene-code-default
exports.sceneCodeDefault = async (req, res) => {
    res.render('scene-code-default', { codeInfo });
}

// GET scene-lobby-default
exports.sceneLobbyDefault = async (req, res) => {
    res.render('scene-lobby-default');
}
