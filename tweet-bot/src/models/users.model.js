import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tweet_token: {
        type: String,
        default: null,
    }
}, { timestamps: true, collection: 'users' });

export default mongoose.model('users', userSchema);