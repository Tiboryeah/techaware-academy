const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['Parent', 'Admin'],
            default: 'Parent',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passHash);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('passHash')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.passHash = await bcrypt.hash(this.passHash, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
