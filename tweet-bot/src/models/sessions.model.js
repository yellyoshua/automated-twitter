import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    access_token: {
        type: String,
        required: true
    },
}, { timestamps: true, collection: 'sessions' });

export default mongoose.model('sessions', sessionSchema);