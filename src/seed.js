require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Buddy = require('./models/Buddy');

const seedData = async () => {
    try {
        // 1. Kết nối Database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🌱 Connected to MongoDB for seeding...');

        // 2. Xóa dữ liệu cũ (Tùy chọn - Cẩn thận khi dùng!)
        await Category.deleteMany({});
        await Buddy.deleteMany({});
        console.log('Cleaning old data...');

        // 3. Tạo Categories mẫu
        const categories = await Category.insertMany([
            { name: 'Dog', description: 'Loyal and energetic companions' },
            { name: 'Cat', description: 'Independent and elegant pets' },
            { name: 'Bird', description: 'Colorful and musical friends' },
            { name: 'Rabbit', description: 'Soft and quiet small pets' }
        ]);
        console.log('✅ Categories seeded!');

        // 4. Tạo Buddies mẫu (Gán ngẫu nhiên vào các Category vừa tạo)
        const buddies = [
            {
                name: 'Golden Retriever',
                category: categories[0]._id, // Dog
                age: 2,
                gender: 'male',
                breed: 'Golden',
                image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400',
                description: 'Very friendly and loves to play fetch.'
            },
            {
                name: 'British Shorthair',
                category: categories[1]._id, // Cat
                age: 1,
                gender: 'female',
                breed: 'Shorthair',
                image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400',
                description: 'Calm, easy-going, and very plush coat.'
            },
            {
                name: 'Husky Siberian',
                category: categories[0]._id, // Dog
                age: 3,
                gender: 'male',
                breed: 'Husky',
                image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400',
                description: 'High energy and loves the cold weather.'
            },
            {
                name: 'Parrot Blue',
                category: categories[2]._id, // Bird
                age: 5,
                gender: 'female',
                breed: 'Macaw',
                image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=400',
                description: 'Can talk and loves colorful toys.'
            },
            {
                name: 'Corgi Pembroke',
                category: categories[0]._id, // Dog
                age: 2,
                gender: 'female',
                breed: 'Corgi',
                image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=400',
                description: 'Short legs, big personality!'
            }
        ];

        await Buddy.insertMany(buddies);
        console.log('✅ Buddies seeded!');

        console.log('✨ Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedData();