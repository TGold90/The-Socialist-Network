const router = require('express').Router();
const {
    getUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// get all Users / create User
router.route('/users').get(getUsers).post(createNewUser);

// get user by id, delete by id, update by id.
router.route('/users/:userId').get(getUserById).delete(deleteUser).put(updateUser);

// /api/students/:studentId/assignments
router.route('/users/:userId/friends/:friendID').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId
router.route('/users/:userId/assignments/:friendId').delete(removeFriend);

module.exports = router;