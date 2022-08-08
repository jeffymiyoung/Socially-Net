// Imports
const { User, Thought } = require('../models');

// User Functions
const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No User found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => res.status(400).json(err));
    },

    // PUT/UPDATE user by ID
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidates: true
        })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No User found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // POST new friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendsId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No User found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    },

    // DELETE friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    },

    // DELETE user and their thoughts
    deleteUser({ params }, res) {
        Thought.deleteMany({ userId: params.id })
            .then(() => {
                User.findOneAndDelete({ _id: params.id })
                    .then((dbUserData) => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No User found with this ID!' });
                            return;
                        }
                        res.json(dbUserData);
                    })
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });

    },
};

// Export for External
module.exports = userController;