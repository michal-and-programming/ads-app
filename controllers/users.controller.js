const User = require('../models/User.model');

exports.infoUser = async (req, res) => {
  try {
    const login = req.session.login;

    if (!login) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    const user = await User.findOne({ login });

    res.json({
      login: user.login,
      avatar: user.avatar,
      phone: user.phone
    });

  } catch (err) {
    res.status(500).json(err);
  }
};