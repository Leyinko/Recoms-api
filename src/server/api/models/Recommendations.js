import mongoose from 'mongoose';

const userCollectionSchema = new mongoose.Schema(
  {
    collection: { type: String, required: true },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    owner: { type: mongoose.Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true, collection: 'Collections', suppressReservedKeysWarning: true }
);

const recommendationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String },
    category: {
      type: [String],
      required: true,
      enum: ['Literature', 'Cinema', 'Music', 'Television', 'Arts', 'Games', 'Travel', 'Culture', 'Education'],
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    tags: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: 'You can add up to 5 tags only',
      },
    },
    user: { type: mongoose.Types.ObjectId, ref: 'Users' },
  },
  { timestamps: true, collection: 'Recommendations', suppressReservedKeysWarning: true }
);

const Collection = mongoose.model('Collection', userCollectionSchema);
const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export { Collection, Recommendation };
