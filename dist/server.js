"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cirandarDB';
const connectWithRetry = () => {
    mongoose_1.default.connect(mongoUri)
        .then(() => console.log('MongoDB connected'))
        .catch(err => {
        console.error('MongoDB connection error:', err);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5001); // Retry connection after 5 seconds
    });
};
connectWithRetry();
