// Imports
const { Schema, model } = require('mongoose');

// User Schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'E-mail is required!',
            match: [/.+@.+\..+/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Virtual called friendCount to retrieve friend.length of user's friend's
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

// User Model thru Schema
const User = model('User', UserSchema);

// Export for External
module.exports = User;