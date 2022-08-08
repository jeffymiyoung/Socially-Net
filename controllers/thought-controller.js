// Imports
const { Thought, User } = require('../models');

// Thought Controller
const ThoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET single Thought by ID
    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // POST thought (create)
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST reaction (create)
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    },

    // PUT/UPDATE thought by ID
    updateThought({ params, body }, res) {
        Thought.FindByIdAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought with this ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    },

    // DELETE reaction 
    deleteReaction({ params }, res) {
        Thought.FindOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    },

    // DELETE thought by ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'No Thought found with this ID!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.id },
                    { $pull: { thoughts: params.id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                res.json(dbdUserData);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            })
    }
};

// Export for External
module.exports = ThoughtController;