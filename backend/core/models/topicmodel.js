let mongoose = require('mongoose')
let topicSchema = new mongoose.Schema({
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