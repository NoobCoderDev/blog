import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'posts', 
        required: true,
      },
    username : {
        type : String,
        required : true,
        trim : true
    },
    comments : {
        type : String,
        required : true,
        trim : true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const commentModel = mongoose.model('comments',commentSchema);

export default commentModel ;
