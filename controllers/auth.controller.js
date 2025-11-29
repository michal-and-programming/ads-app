const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/Session.model');
const getImageFileType = require('../utils/getImageFileType');
const removeImage = require('../utils/removeImage');

exports.register = async (req, res) => {
  try{
    const {login, password, phone} = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

    if(login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      phone &&
      typeof phone === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ){
      const userWithLogin = await User.findOne({login});

      if(userWithLogin){
        return res.status(409).send({message: 'User already exists'});
      }

      const user = await User.create({
        login, 
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phone
      });
      return res.status(201).send({message: 'User created' + ' ' + user.login});
    }
    else {
      if (req.file) removeImage(req.file.path);
      res.status(400).send({message: 'Bad request'});
    }

  } catch (err){
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try{
    const {login, password} = req.body;

    if(login && typeof login === 'string' && password && typeof password === 'string'){
      const user = await User.findOne({login});

      if(!user) return res.status(400).send({message: 'Wrong login or password'})
    
    else {
      if(bcrypt.compareSync(password, user.password)){
        req.session.login = user.login;
        req.session.userId = user._id;
        res.status(200).send({message: 'Login successful'})
        console.log('After login, session:', req.session);
      }
      else {
        res.status(400).send({message: 'Bad request'});
      }
    }    
    }
  } catch {
    res.status(500).send(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('login avatar phone');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy(async () => {
      if (process.env.NODE_ENV !== "production") {
        await Session.deleteMany({});
      }
      res.json({ message: "Logged out" });
    });
  }
  catch(err) {
    res.status(500).json(err);
  }
};
