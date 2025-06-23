import mongoose, { Schema, Document } from 'mongoose';

interface BMIEntry {
  weight: number;
  timestamp: Date;
}

interface BMIDocument extends Document {
  userId: mongoose.Types.ObjectId;
  height: number;
  weightEntries: BMIEntry[];
}

const bmiSchema = new Schema<BMIDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  height: {
    type: Number,
    required: function() { return this.isNew; }
  },
  weightEntries: [{
    weight: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

bmiSchema.pre('save', async function(this: BMIDocument, next) {
  try {
    const User = mongoose.model('User');
    const user = await User.findById(this.userId);
    if (!user) {
      return next(new Error('User not found'));
    }
    this.height = user.height;
    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
});

const BMI = mongoose.models.BMI || mongoose.model<BMIDocument>('BMI', bmiSchema);

export default BMI;
