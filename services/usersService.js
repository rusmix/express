const User = require('../database/models/user');

class UsersService {
    constructor() {
        this.User = User;
    }

    async findById(_id) {
        return this.User.findOne({ _id });
    }

    async findAll() {
        return this.User.find();
    }

    async deleteById(_id) {
        return this.User.deleteOne({ _id })
    }

    async createOne(data) {
        return (new User(data)).save();
    }

    async updateById(_id, data) {
        return this.User.updateOne({ _id }, data );
    }
}

module.exports = UsersService;