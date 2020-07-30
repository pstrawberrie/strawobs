/**
 * Pages Controller
 */

// GET scene-default
exports.sceneDefault = async (req, res) => {
    res.render('scene-default');
}

// GET scene-default-over
exports.sceneDefaultOver = async (req, res) => {
    res.render('scene-default-over');
}
