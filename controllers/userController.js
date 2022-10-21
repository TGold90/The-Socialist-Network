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
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //GET USER BY ID
    async getUserById(req, res) {
        console.log(req.params.userId);
        try {
            const singleUser = await (await (await User.findOne({ _id: req.params.userId })).populate('thoughts')).populate('friends');
            res.json(singleUser);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //UPDATE USER BY ID
    async updateUser(req, res) {
        try {
            // i think the filter is not quite right. see { _id: ObjectId(req.body.id) }, from activity 6
            const changedUser = await User.findOneAndUpdate(
                { _id: req.params.userId }, { $set: req.body }, { returnDocument: "after" });
            res.json(changedUser);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    //REMOVE USER BY ID
    async deleteUser(req, res) {
        try {
            const destroyUser = await User.findByIdAndDelete(req.params.userId);
            res.status(200).json(destroyUser);
            console.log(`Deleted: ${destroyUser}`);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    // ADD FRIEND
    async addFriend(req, res) {
        try {
            const newFriend = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            res.json(newFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const killFriend = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            res.json(killFriend);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
};


