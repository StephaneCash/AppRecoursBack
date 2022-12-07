const router = require('express').Router();
const profController = require('../controllers/profController');
const auth = require('../auth/auth');

router.post('/', profController.addProf);
router.get('/', profController.getAllData);
router.get('/:id', auth, profController.getOneProf);
router.put('/:id', profController.updateProf);
router.delete('/:id', profController.deleteProf);

module.exports = router;