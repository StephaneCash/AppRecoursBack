const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../auth/auth');

router.post('/', userController.addUser);
router.get('/', auth, userController.getAllUsers);
router.get('/:id', auth, userController.getOneUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;