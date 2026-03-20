const buddyService = require('../services/buddyService');
const categoryService = require('../services/categoryService');

// Hiển thị danh sách buddy
async function list(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5; // Bạn có thể chỉnh số lượng tùy ý ở đây

        const { buddies, currentPage, totalPages } = await buddyService.getAll(page, limit);

        res.render('admin/buddy/list', {
            pageTitle: 'Buddy List',
            buddies,
            currentPage,
            totalPages
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Hiển thị form tạo mới buddy
async function create(req, res) {
    const categories = await categoryService.getCategoryByOptions();
    res.render('admin/buddy/create', {pageTitle: 'Create Buddy', categories});
}

// Xử lý lưu thông tin buddy mới
async function store(req, res) {
    try {
        await buddyService.createBuddy({
            ...req.body,
            age: req.body?.age === '' ? 0 : Number(req.body?.age), // Chuyển age sang số, nếu là chuỗi rỗng thì mặc định là 0
        });
        return res.redirect('/admin/buddy/list');
    } catch (err) {
        const categories = await categoryService.getCategoryByOptions();
        return res.status(400).render('admin/buddy/create', {
            pageTitle: 'Create Buddy',  // Cần truyền lại pageTitle để hiển thị tiêu đề trang
            categories,  // Cần truyền lại danh sách category để hiển thị dropdown
            error: err?.message || 'Create buddy failed! Please try again.', // Hiển thị lỗi nếu có
            form: req.body, // Giữ lại dữ liệu đã nhập trong form
        });
    }
}

// Hiển thị form chỉnh sửa buddy
async function edit(req, res) {
    const [buddy, categories] = await Promise.all([
        buddyService.getBuddyById(req.params.id),
        categoryService.getCategoryByOptions(),
    ]);
    res.render('admin/buddy/edit', {pageTitle: 'Edit Buddy', buddy, categories});
}

// Xử lý cập nhật thông tin buddy
async function update(req, res) {
    try {
        const updated = await buddyService.updateBuddyById(req.params.id, {
            ...req.body,
            age: req.body?.age === '' ? 0 : Number(req.body?.age), // Chuyển age sang số, nếu là chuỗi rỗng thì mặc định là 0
        });
        if (!updated) return res.status(404).send('Buddy not found');
        return res.redirect('/admin/buddy/list');
    } catch (err) {
        const [buddy, categories] = await Promise.all([
            buddyService.getBuddyById(req.params.id),
            categoryService.getCategoryByOptions(),
        ]);
        return res.status(400).render('admin/buddy/edit', {
            pageTitle: 'Edit Buddy',  // Cần truyền lại pageTitle để hiển thị tiêu đề trang
            buddy: buddy || { _id: req.params.id, ...req.body },  // Nếu không tìm thấy buddy thì giữ lại dữ liệu đã nhập
            categories,  // Cần truyền lại danh sách category để hiển thị dropdown
            error: err?.message || 'Update buddy failed! Please try again.', // Hiển thị lỗi nếu có
        });
    }
}

// Xử lý xóa buddy
async function remove(req, res) {
    await buddyService.deleteBuddyById(req.params.id);
    return res.redirect('/admin/buddy/list');
}

module.exports = {
    list,
    create,
    store,
    edit,
    update,
    remove,
};