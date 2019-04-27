const utils = require("./../commons/utils");
let mongoose = require('mongoose')
let topicSchema = require('./topicmodel');
let userSchema = require('./usermodel')

let questionSchema = new mongoose.Schema({
    questionId : {
        type: String,
        required: true,
        trim :true,
        default : utils.getUniqueId()
    },
    questionText: {
        type: String,
        required: true,
        trim :true,
    },
    owner : {
        type: String,
        required: true,
        trim :true,
    },
    topics : [String],
    followers : [String],
},
{
    timestamps: true
});

module.exports = mongoose.model('question', questionSchema)