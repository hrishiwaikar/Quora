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
    userId : {
        type: String,
        required: true,
        trim :true,
    },
    questionId : {
        type: String,
        required: true,
        trim :true,
    },
    isAnonymous : {
        type: Boolean,
        default:false
    },
    upvotes : {
        type : Number,
        default : 0
    },
    downvotes : {
        type : Number,
        default : 0
    },
    bookmarkedBy : {
        type : Number,
        default : 0
    },
    noOfTimesviewed : {
        type : Number,
        default : 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('answer', answerSchema)
