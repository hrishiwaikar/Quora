let mongoose = require('mongoose')
let userSchema = require('./usermodel')

let answerSchema = new mongoose.Schema({
    answerText: {
        type: String,
        required: true,
        trim :true,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    isAnonymous : {
        type: Boolean,
        default:false
    },
    upvotes : [
        {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
    ],
    downvotes : [
        {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
    ],
    //comments to be added here.
},
{
    timestamps: true
});

module.exports = mongoose.model('answer', answerSchema)
