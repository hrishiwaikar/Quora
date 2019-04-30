let mongoose = require('mongoose')
let followSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    following: {
        type: String,
        required: true,
        trim: true,
    },
    followingBack: {
        type: Boolean,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
});
followSchema.pre('save', function (next) {
    let now = Date.now()
    this.updatedAt = now
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})

module.exports = mongoose.model('follow', followSchema)