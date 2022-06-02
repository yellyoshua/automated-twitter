import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    userId: {},
    accessToken: {},
    refreshToken: {},
    expiresIn: {},
    
}, { timestamps: true, collection: 'auth' });

export default mongoose.model('auth', authSchema);