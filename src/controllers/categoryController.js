const categoryService = require('../services/categoryService');

// Hiển thị danh sách category
async function list(req, res) {
    const categories = await categoryService.listCategories();
    res.render('admin/category/list', {pageTitle: 'Categories', categories});
}

// Hiển thị form tạo mới category
async function create(req, res) {
    res.render('admin/category/create', {pageTitle: 'Create Category', form: {}}); // Cần truyền pageTitle để hiển thị tiêu đề trang
}

// Xử lý lưu thông tin category mới
async function store(req, res) {
    try {
        await categoryService.createCategory(req.body);
        return res.redirect('/admin/category/list');
    } catch (err) {
        return res.status(400).render('admin/category/create', {
            pageTitle: 'Create Category',  // Cần truyền lại pageTitle để hiển thị tiêu đề trang
            error: err?.message || 'Create category failed! Please try again.', // Hiển thị lỗi nếu có
            form: req.body, // Giữ lại dữ liệu đã nhập trong form
        });
    }
}

// Xử lý xóa category
async function remove(req, res) {
    await categoryService.deleteCategoryById(req.params.id);
    return res.redirect('/admin/category/list');
}

module.exports = {
    list,
    create,
    store,
    remove,
};