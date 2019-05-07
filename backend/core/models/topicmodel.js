const utils = require("./../commons/utils");
let mongoose = require('mongoose')
let topicSchema = new mongoose.Schema({
    topicId : {
        type: String,
        required: true,
        trim :true,
        default : utils.getUniqueId(),
        unique: true
    },
    topicText: {
        type: String,
        required: true,
        trim :true,
        unique: true,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('topic', topicSchema)