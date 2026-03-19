const router = require('express').Router();

router.get('/list', buddyController.list);
router.get('/create', buddyController.create);
router.post('/store', buddyController.store);
router.get('/edit/:id', buddyController.edit);
router.post('/update/:id', buddyController.update);
router.get('/delete/:id', buddyController.delete);

module.exports = router;