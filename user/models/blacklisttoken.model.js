//A blacklist token (more commonly called a token revocation list or denylist) is used to invalidate authentication tokens before they naturally expire.

const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now,
        expires: 3600 // 1 hr in seconds
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('blacklisttoken', blacklistTokenSchema);