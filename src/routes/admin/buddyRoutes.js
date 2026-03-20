const router = require('express').Router();
const buddyController = require('../../controllers/buddyController');

router.get('/list', buddyController.list);
router.get('/create', buddyController.create);
router.post('/store', buddyController.store);
router.get('/edit/:id', buddyController.edit);
router.post('/update/:id', buddyController.update);
router.post('/delete/:id', buddyController.remove);

module.exports = router;