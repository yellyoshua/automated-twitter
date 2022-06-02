import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    },
    tweetToken: {
        type: String,
        required: true
    },
}, { timestamps: true, collection: 'auth' });

export default mongoose.model('auth', authSchema);