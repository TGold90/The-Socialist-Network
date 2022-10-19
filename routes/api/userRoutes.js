const router = require('express').Router();
const {
    getUsers,
    createNewUser,
    getUserById,
    // updateUser,
    // deleteUser,
    // addFriend,
    // removeFriend,
} = require('../../controllers/userController');

// get all Users / create User
router.route('/').get(getUsers)
    .post(createNewUser);

// // get user by id, delete by id, update by id.
router.route('/:userId').get(getUserById)
// .delete(deleteUser).put(updateUser);

// // add friend to User
// router.route('/users/:userId/friends/:friendID').post(addFriend);

// // delete friend from User
// router.route('/users/:userId/assignments/:friendId').delete(removeFriend);

module.exports = router;