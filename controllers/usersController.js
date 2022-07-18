const ObjectId = require("mongoose").Types.ObjectId;
const UsersService = require("../services/usersService");

const { validationResult } = require("express-validator");

class UsersController {
  constructor() {
    this.UsersService = new UsersService();
  }

  getUsers = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { limit, page } = req.query;
    const usersAmount = await this.UsersService.countUsers();
    const users = await this.UsersService.findWithPagination(+limit, +page);
    return res.send({
      limit: +limit,
      page: +page,
      usersAmount,
      users,
    });
  };

  getUser = async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("userId is invalid (should be ObjectId)");
      const user = await this.UsersService.findById(req.params.id);
      if (!user) return res.status(404).send("User not found");
      return res.send(user);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  createUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      return res.status(201).send(this.UsersService.createOne(req.body));
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  deleteUser = async (req, res) => {
    try {
      return res.send(await this.UsersService.deleteById(req.params.id));
    } catch (e) {
      return res.status(500).send(e.message);
    }
  };

  updateUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      return res.send(
        await this.UsersService.updateOne(req.params.id, req.body)
      );
    } catch (e) {
      return res.status(500).send(e.message);
    }
  };
}

module.exports = UsersController;
