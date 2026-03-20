const Buddy = require('../models/Buddy');

// Liệt kê tất cả buddy cùng với tên category.
async function listBuddies() {
    return Buddy.find()
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .lean();
}

// Tìm kiếm buddy theo ID và hiển thị thông tin chi tiết, bao gồm tên category.
async function getBuddyById(id) {
    return Buddy.findById(id)
        .populate('category', 'name')
        .lean();
}

// Tạo mới một buddy với thông tin được cung cấp trong payload.
async function createBuddy(payload) {
    const doc = new Buddy({
        name: payload?.name,
        category: payload?.category,
        age: payload?.age ?? 0, // Mặc định age là 0 nếu không có trong payload
        gender: payload?.gender,
        breed: payload?.breed || '', // Thêm trường breed nếu có trong payload
        image: payload?.image || '', // Thêm trường image nếu có trong payload
        description: payload?.description || '', // Thêm trường description nếu có trong payload
    });
    await doc.save();
    return doc.toObject();
}

// Cập nhật thông tin buddy theo ID với thông tin được cung cấp trong payload.
async function updateBuddyById(id, payload) {
    return Buddy.findByIdAndUpdate(id, {
        name: payload?.name,
        category: payload?.category,
        age: payload?.age ?? 0, // Mặc định age là 0 nếu không có trong payload
        gender: payload?.gender,
        breed: payload?.breed || '', // Thêm trường breed nếu có trong payload
        image: payload?.image || '', // Thêm trường image nếu có trong payload
        description: payload?.description || '', // Thêm trường description nếu có trong payload
    }, { new: true, runValidators: true}).lean();
}

// Xóa buddy theo ID.
async function deleteBuddyById(id) {
    return Buddy.findByIdAndDelete(id);
}
// Lấy tất cả buddy với phân trang, mỗi trang hiển thị 5 buddy.
async function getAll(page = 1, limit = 5) {
    const skip = (page - 1) * limit;
    
    // Lấy dữ liệu có phân trang
    const buddies = await Buddy.find()
        .populate('category')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Hiện con mới nhất lên đầu

    // Đếm tổng số lượng để tính tổng số trang
    const totalBuddies = await Buddy.countDocuments();
    const totalPages = Math.ceil(totalBuddies / limit);

    return {
        buddies,
        currentPage: page,
        totalPages,
        totalBuddies
    };
}

module.exports = {
    listBuddies,
    getBuddyById,
    createBuddy,
    updateBuddyById,
    deleteBuddyById,
    getAll,
};


