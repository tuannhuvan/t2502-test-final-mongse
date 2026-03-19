const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const router = express.Router();
const morgan = require('morgan'); // HTTP request logger middleware


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware để phân tích dữ liệu từ form submissions
app.use(methodOverride('_method')); // Sử dụng method-override để hỗ trợ các phương thức HTTP khác ngoài GET và POST

app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // su dung EJS lam view engine
app.use(expressLayouts); // su dung express-ejs-layouts middleware
app.set('layout', 'layouts/admin'); // Cai dat layout mac dinh cho toan bo ung dung

app.use('public', express.static(path.join(__dirname, 'public'))); // serve static files from the 'public' directory

app.use(routes); // su dung router đã được định nghĩa trong routes/index.js

app.use((req, res) => res.status(404).render('404', { title: 'Page Not Found' })); // 404 error handling

module.exports = app;
