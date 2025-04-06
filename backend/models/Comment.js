import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  creationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creation',
    required: [true, 'Creation ID is required']
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;