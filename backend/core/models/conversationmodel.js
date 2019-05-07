let mongoose = require('mongoose')
let conversationSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    messages: {
        type: Number,
        required: true,
    },
    users: [String],
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
});
conversationSchema.pre('save', function (next) {
    let now = Date.now()
    this.updatedAt = now
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})

module.exports = mongoose.model('conversation', conversationSchema)