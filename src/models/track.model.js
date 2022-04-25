const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const trackSchema = mongoose.Schema(
  {
    application: {
      type: String,
      required: true,
      trim: true,
    },
    environment: {
      type: String,
      trim: true,
      default: 'production',
    },
    event: {
      type: String,
      trim: true,
    },
    version: {
      type: String,
      trim: true,
      default: '1.0.0',
    },
    json_data: {
      type: Object,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
trackSchema.plugin(toJSON);
trackSchema.plugin(paginate);

/**
 * @typedef Track
 */
const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
