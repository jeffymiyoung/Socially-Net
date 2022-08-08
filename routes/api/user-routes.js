// Imports
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteFriend,
    deleteUser
} = require ('../../controllers/user-controller');

// Routes for Users
router
    .router('/')
    .get(getAllUsers)
    .post(createUser)
;

// Routes for ID
router
    .router('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
;

// Routers for friend
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)
;

// Export for External
module.exprots = router;