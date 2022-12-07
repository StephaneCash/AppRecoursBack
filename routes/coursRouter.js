const coursController = require('../controllers/coursController');
const router = require('express').Router();
const auth = require('../auth/auth');

router.post('/', coursController.addRecours);
router.get('/', coursController.getAllRecours);
router.get('/:id', coursController.getOneRecours);
router.put('/:id', coursController.updateRecours);
router.delete('/:id', coursController.deleteRecours);

module.exports = router;