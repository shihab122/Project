// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      PUblic
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Get All BootCamps!' });
};

// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show BootCamp ${req.params.id} Successfully!`
  });
};

// @desc        Create new bootcamp
// @route       GET /api/v1/bootcamps/create
// @access      Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create BootCamp!' });
};

// @desc        Update bootcamp
// @route       GET /api/v1/bootcamps/update/:id
// @access      Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update BootCamp ${req.params.id} Successfully!`
  });
};

// @desc        Delete bootcamp
// @route       GET /api/v1/bootcamps/delete/:id
// @access      Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete BootCamp ${req.params.id} Successfully!`
  });
};
