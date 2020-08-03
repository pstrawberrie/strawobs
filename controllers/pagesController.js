/**
 * Pages Controller
 */
const codeInfo = require('../code.json');

// GET scene-default
exports.sceneDefault = async (req, res) => {
    res.render('scene-default');
}

// GET scene-code
exports.sceneCode = async (req, res) => {
    res.render('scene-code', { codeInfo });
}
