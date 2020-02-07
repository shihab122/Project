const BootCamp = require('../models/Bootcamp');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      PUblic
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await BootCamp.find();
    res.status(200).json({success: true, count: bootcamps.length, data: bootcamps});
  } catch (error) {
    res.status(400).json({success: false});
  }
};

// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);
    if(!bootcamp) {
      return res.status(400).json({success: false});
    }
    return res.status(200).json({success: true, data: bootcamp});
  } catch (error) {
    res.status(400).json({success: false});
  }
  res.status(200).json({
    success: true,
    msg: `Show BootCamp ${req.params.id} Successfully!`
  });
};

// @desc        Create new bootcamp
// @route       GET /api/v1/bootcamps/create
// @access      Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp
    })
  } catch (error) {
    res.status(400).json({success:true})
  }
};

// @desc        Update bootcamp
// @route       GET /api/v1/bootcamps/update/:id
// @access      Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if(!bootcamp){
      return res.status(400).json({success: false});
    }
    res.status(200).json({success: true, data: bootcamp});
  } catch (error) {
    res.status(400).json({success: false});
  }
};

// @desc        Delete bootcamp
// @route       GET /api/v1/bootcamps/delete/:id
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);
    if(!bootcamp){
      return res.status(400).json({success: false});
    }
    res.status(204).json({success: true, data: {}});
  } catch (error) {
    res.status(400).json({success: false});
  }
};
