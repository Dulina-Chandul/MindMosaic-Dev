import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creation'
  }]
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;