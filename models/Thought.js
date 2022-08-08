// Imports 
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction Schema
const ReactionSchema = new Schema( 
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            require: true,
            maxLength: 280
        },
        userrname: {
            type: String,
            require: 'Please provide valid username for this reaction!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    },
);

// Thought Schema
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'Please provide some thought text!',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Please provide a valid username for this thought!'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

// Reaction Count from virtual
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// Thought Model thru Schema
const Thought = model('Thought', ThoughtSchema);

// Export for External
module.exports = Thought;