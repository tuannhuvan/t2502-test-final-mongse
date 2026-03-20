const express = require('express');
const categoryController = require('../../controllers/categoryController');

const router = express.Router();

router.get('/list', categoryController.list);
router.get('/create', categoryController.create);
router.post('/store', categoryController.store);
router.post('/delete/:id', categoryController.remove);

module.exports = router;