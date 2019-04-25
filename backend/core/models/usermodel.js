let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim :true,
    },
    firstName: {
        type: String,
        required: true,
        trim :true,
    },
    lastName: {
        type: String,
        required: true,
        trim :true,
    },
    password: {
        type: String,
        required: true,
        trim :true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
        trim :true,
    }
})
userSchema.pre('save', function (next) {
    let now = Date.now()
    this.updatedAt = now
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})
module.exports = mongoose.model('user', userSchema)