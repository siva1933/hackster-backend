const Team = require("../models/teams");

exports.getTeams = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.pageSize) || 20;
  const search = req.query.search;

  try {
    let totalItems, teams;
    if (search && search !== null && search !== undefined) {
      totalItems = await Team.find({
        team_name: { $regex: search },
      }).countDocuments();
      teams = await Team.find({
        team_name: { $regex: search },
      })
        .sort({
          createdAt: -1,
        })
        .skip((page - 1) * perPage)
        .limit(perPage);
    } else {
      totalItems = await Team.find().countDocuments();
      teams = await Team.find()
        .sort({
          createdAt: -1,
        })
        .skip((page - 1) * perPage)
        .limit(perPage);
    }
    // .populate('creator')
    // .sort({ createdAt: -1 })

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

exports.addToTeams = async (req, res, next) => {
  let data = req.body;
  const team = new Team(data);
  try {
    const dbRes = await team.save(data);
    res.status(201).json({
      success: true,
      data: dbRes,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.teamWon = async (req, res, next) => {
  let data = req.body;
  console.log(data);
  try {
    const teamWon = await Team.findById(data.wonId);
    const teamLost = await Team.findById(data.lostId);

    if (data.isTie) {
      teamLost.ties = teamLost.ties + 1;
      teamWon.ties = teamWon.ties + 1;
    } else {
      teamWon.wins = teamWon.wins + 1;
      teamLost.losses = teamLost.losses + 1;
    }

    teamWon.score = teamWon.wins * 3 + teamWon.ties * 1;
    teamLost.score = teamLost.wins * 3 + teamLost.ties * 1;

    await teamWon.save();
    await teamLost.save();
    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
