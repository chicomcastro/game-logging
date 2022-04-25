const httpStatus = require('http-status');
const { Track } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a track
 * @param {Object} trackBody
 * @returns {Promise<Track>}
 */
const createTrack = async (trackBody) => {
  return Track.create(trackBody);
};

/**
 * Query for tracks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTracks = async (filter, options) => {
  const tracks = await Track.paginate(filter, options);
  return tracks;
};

/**
 * Get track by id
 * @param {ObjectId} id
 * @returns {Promise<Track>}
 */
const getTrackById = async (id) => {
  return Track.findById(id);
};

/**
 * Update track by id
 * @param {ObjectId} trackId
 * @param {Object} updateBody
 * @returns {Promise<Track>}
 */
const updateTrackById = async (trackId, updateBody) => {
  const track = await getTrackById(trackId);
  if (!track) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Track not found');
  }
  if (updateBody.email && (await Track.isEmailTaken(updateBody.email, trackId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(track, updateBody);
  await track.save();
  return track;
};

/**
 * Delete track by id
 * @param {ObjectId} trackId
 * @returns {Promise<Track>}
 */
const deleteTrackById = async (trackId) => {
  const track = await getTrackById(trackId);
  if (!track) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Track not found');
  }
  await track.remove();
  return track;
};

module.exports = {
  createTrack,
  queryTracks,
  getTrackById,
  updateTrackById,
  deleteTrackById,
};
