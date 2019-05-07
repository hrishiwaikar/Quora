const utils = require("./../commons/utils");
let mongoose = require('mongoose')
let userSchema = require('./usermodel')

let answerUpvoteSchema = new mongoose.Schema({
    answerupvoteId : {
        type: String,
        required: true,
        trim :true,
        default : utils.getUniqueId(),
        unique: true,
    },
    userId : {
        type: String,
        required: true,
        trim :true,
    },
    answerId : {
        type: String,
        required: true,
        trim :true,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('answerupvote', answerUpvoteSchema)
