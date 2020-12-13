const Team = require("../models/teams");

exports.getTeams = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 20;

  try {
    const totalItems = await Team.find().countDocuments();
    const teams = await Team.find()
      // .populate('creator')
      // .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(20);
    res.status(200).json({
      teams,
      totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
