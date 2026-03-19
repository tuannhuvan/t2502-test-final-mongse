const buddyService = require('../services/buddyService');
const categoryService = require('../services/categoryService');

// Hiển thị danh sách buddy
async function list(req, res) {
    const buddies = await buddyService.listBuddies();
    res.render('admin/buddy/list', {pageTitle: 'Buddies', buddies});
}

