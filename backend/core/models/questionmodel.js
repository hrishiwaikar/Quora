let mongoose = require('mongoose')
let topicSchema = require('./topicmodel');
let userSchema = require('./usermodel')

let questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim :true,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    topics : [
        {
            type: Schema.Types.ObjectId, 
            ref: 'topic'
        }
    ],
    followers : [
        {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
    ],
},
{
    timestamps: true
});

module.exports = mongoose.model('question', questionSchema)