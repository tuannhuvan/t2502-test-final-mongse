const express = require('express');

const buddyRoutes = require('./admin/buddyRoutes');
const categoryRoutes = require('./admin/categoryRoutes');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/admin/buddy/list'));
router.get('/admin', (req, res) => res.redirect('/admin/buddy/list'));

router.use('/admin/buddy', buddyRoutes);
router.use('/admin/category', categoryRoutes);

module.exports = router;