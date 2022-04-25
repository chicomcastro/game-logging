const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTrack = {
  body: Joi.object().keys({
    // email: Joi.string().required().email(),
    // password: Joi.string().required().custom(password),
    // name: Joi.string().required(),
    // role: Joi.string().required().valid('track', 'admin'),
  }),
};

const getTracks = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTrack = {
  params: Joi.object().keys({
    trackId: Joi.string().custom(objectId),
  }),
};

const updateTrack = {
  params: Joi.object().keys({
    trackId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      // email: Joi.string().email(),
      // password: Joi.string().custom(password),
      // name: Joi.string(),
    })
    .min(1),
};

const deleteTrack = {
  params: Joi.object().keys({
    trackId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTrack,
  getTracks,
  getTrack,
  updateTrack,
  deleteTrack,
};
