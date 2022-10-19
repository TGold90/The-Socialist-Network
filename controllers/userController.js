const res = require('express/lib/response');
const { User, Reaction, Thoughts } = require('../models');

module.exports = {
    //GET ALL USERS
    async getUsers(req, res) {
        try {
            const allUsers = await User.find();
            res.json(allUsers);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    },
    //CREATE NEW USER
    async createNewUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
            console.log(newUser);
        } catch (error) {
            res.status(500).json(err.message);
        }
    },
    //GET USER BY ID
    async getUserById(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId });
            res.json(singleUser);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
};
    //UPDATE USER BY ID
    // async updateUser(req, res) {
    //     try {

    //     } catch (error) {

    //     }
    // },
    //REMOVE USER BY ID
    // async deleteUser() { },
    // to add a new friend to a user's friend list
    // async addFriend() { },
    // remove a friend from a user's friend list
    // async removeFriend() { },
