const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/],
        },
        //populates all thoughts -- one to many
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thoughts",
            }
        ],
        //populates friends of user -- one to many
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
