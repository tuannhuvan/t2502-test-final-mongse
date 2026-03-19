require ('dotenv').config();
const {connectDb} = require('./config/db');
const app = require('./app');

async function main() {
    const port = Number(process.env.PORT) || 3000;
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/t2502e-test-final-mongose';
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    await connectDb(mongoUri);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}
main().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});