import mongoose from 'mongoose';
export default function repositoryController(model = mongoose.Model) {
    return {
        findOne: async (query) => {
            return await model.findOne(query);
        },
        find: async (query) => {
            return await model.find(query);
        },
        create: async (data) => {
            return await model.create(data);
        },
        update: async (query, data) => {
            return await model.update(query, data);
        },
        delete: async (query) => {
            return await model.deleteOne(query);
        },
        count: async (query) => {
            return await model.count(query);
        },
    }
}