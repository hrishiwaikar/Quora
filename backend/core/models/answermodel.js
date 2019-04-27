const utils = require("./../commons/utils");
let mongoose = require('mongoose')
let userSchema = require('./usermodel')

let answerSchema = new mongoose.Schema({
    answerId : {
        type: String,
        required: true,
        trim :true,
        default : utils.getUniqueId()
    },
    answerText: {
        type: String,
        required: true,
        trim :true,
    },
    owner : {
        type: String,
        required: true,
        trim :true,
    },
    question : {
        type: String,
        required: true,
        trim :true,
    },
    isAnonymous : {
        type: Boolean,
        default:false
    },
    upvotes : [String],
    downvotes : [String],
    bookmarkedBy : [String],
    //comments to be added here.
},
{
    timestamps: true
});

module.exports = mongoose.model('answer', answerSchema)
