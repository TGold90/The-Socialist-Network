const res = require('express/lib/response');
const { User, Reaction, Thoughts } = require('../models');

module.exports = {
    //GET ALL USERS
    getUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err))
    },
    // async getUsers(req, res) {
    //     try {
    //         const allUsers = await User.find();
    //         res.json(allUsers);
    //     }
    //     catch (err) {
    //         res.status(500).json(err.message);
    //     }
    // },
    // CREATE A NEW USER
    async createNewUser(req, res) {
        try {
            const newUser = User.create(req.body);
            res.json(newUser);
        } catch (error) {
            res.status(500).json(err.message);
        }
    },
};


//GET USER BY ID
    // async getUserById(req, res) {
    //     try {
    //         const singleUser = User.findOne({ _id: req.params.userId }).select('-__v');
    //         res.json(singleUser);
    //     } catch (error) {
    //         res.status(500).json(error.message);
    //     }
    // },
    //CREATE A NEW USER
    // async createNewUser(req, res) {
    //     try {
    //         const newUser = User.create(req.body);
    //         res.json(newUser);
    //     } catch (error) {
    //         res.status(500).json(err.message);
    //     }
    // },
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
