const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../database/models/user');
const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    return res.send(await User.find());
}

const getUser = async (req, res) => {
    try {
        if(!ObjectId.isValid(req.params.id))
            return res.status(400).send("userId is invalid (should be ObjectId)");
        const user = await User.findOne({_id: req.params.id });
        if (!user)
           return res.status(404).send('UserId is not valid');
        return res.send(await User.findOne({_id: req.params.id }));
    } catch (e) {
        res.status(500).send(e.message);
    } 
}

const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newUser = new User(req.body);
        return res.status(201).send(await newUser.save());
    } catch (e) {
        res.status(500).send(e.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        return res.send(await User.deleteOne({ _id: req.params.id }));
    } catch (e) {
        return res.status(500).send(e.message);
    }
}

const updateUser = async (req, res) => {
    try {
        return res.send(await User.updateOne({ _id: req.params.id }, req.body ));
    } catch (e) {
        return res.status(500).send(e.message);
    }
}

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser };
