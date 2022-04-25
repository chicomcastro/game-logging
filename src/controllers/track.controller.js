const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { trackService } = require('../services');

const createTrack = catchAsync(async (req, res) => {
  const track = await trackService.createTrack(req.body);
  res.status(httpStatus.CREATED).send(track);
});

const getTracks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await trackService.queryTracks(filter, options);
  res.send(result);
});

const getTrack = catchAsync(async (req, res) => {
  const track = await trackService.getTrackById(req.params.trackId);
  if (!track) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Track not found');
  }
  res.send(track);
});

const updateTrack = catchAsync(async (req, res) => {
  const track = await trackService.updateTrackById(req.params.trackId, req.body);
  res.send(track);
});

const deleteTrack = catchAsync(async (req, res) => {
  await trackService.deleteTrackById(req.params.trackId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTrack,
  getTracks,
  getTrack,
  updateTrack,
  deleteTrack,
};
