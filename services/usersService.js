const User = require("../database/models/user");

class UsersService {
  constructor() {
    this.User = User;
  }

  async findById(_id) {
    return this.User.findOne({ _id });
  }

  async findWithPagination(limit, page) {
    return this.User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
  }

  async deleteById(_id) {
    return this.User.deleteOne({ _id });
  }

  async createOne(data) {
    return new User(data).save();
  }

  async updateById(_id, data) {
    return this.User.updateOne({ _id }, data);
  }

  async countUsers() {
    return this.User.countDocuments({});
  }
}

module.exports = UsersService;
