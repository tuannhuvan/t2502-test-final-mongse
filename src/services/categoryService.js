const { name } = require('ejs');
const Category = require('../models/Category');

// Liệt kê tất cả category.
async function listCategories() {
    return Category.find().sort({ createdAt: -1 }).lean();
}

// Lấy danh sách category với các tùy chọn.
async function getCategoryByOptions() {
    return Category.find().sort({name: 1}) .select('_id name').lean();
}

// Tạo mới một category với thông tin được cung cấp trong payload.
async function crateCategory(payload) {
    const doc = new Category({
        name: payload?.name,
        description: payload?.description || '',
    });
    await doc.save();
    return doc.toObject();
}

// Xóa category theo ID.
async function deleteCategoryById(id) {
    return Category.findByIdAndDelete(id);
}

module.exports = {
    listCategories,
    getCategoryByOptions,
    crateCategory,
    deleteCategoryById,
};

