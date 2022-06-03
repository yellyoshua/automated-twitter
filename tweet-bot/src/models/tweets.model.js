import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    posted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, collection: 'tweets' });


export default mongoose.model('tweets', tweetSchema);