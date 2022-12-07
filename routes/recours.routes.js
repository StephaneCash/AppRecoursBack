const recoursController = require('../controllers/recoursController');
const router = require('express').Router();

router.get('/', recoursController.getAllRecours);
router.get('/:id', recoursController.getOneRecours);
router.post('/', recoursController.addRecours);

router.put('/:id', recoursController.updateRecours);
router.delete('/:id', recoursController.deleteRecours);

module.exports = router;