const filiereController = require('../controllers/filiereController');
const router = require('express').Router();
const auth = require('../auth/auth');

router.post('/', filiereController.addFiliere);
router.get('/', filiereController.getAllFilieres);
router.get('/:id', filiereController.getOneFiliere);
router.put('/:id', filiereController.updateFiliere);
router.delete('/:id', filiereController.deleteFiliere);

module.exports = router;