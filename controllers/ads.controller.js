const Ad = require('../models/Ad.model');
const removeImage = require('../utils/removeImage');
const path = require('path');

exports.loadAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate('author', 'location avatar');
    res.json(ads);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.loadChosen = async (req, res) => {
   try {
    const chosen = await Ad.findById(req.params.id).populate('author', 'login phone avatar');
    res.json(chosen);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.searchAd = async (req, res) => {
  try {
    const phrase = req.params.searchPhrase;

    const ads = await Ad.find({
      title: {
        $regex: phrase,
        $options: 'i'
      }
    });
    res.json(ads);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.addNewAd = async (req, res) => {
  try {
    const { title, content, date, price, location, phone } = req.body;
    const file = req.file;

    if (!title || !content || !date || !price || !location || !phone || !file) {
      if (file) removeImage(file.path);
      return res.status(400).json({ message: 'Wrong input' });
    }

    const imgName = req.file.filename;

    const newAd = new Ad({
      title,
      content,
      date,
      img: imgName,
      price,
      location,
      phone,
      author: req.session.userId
    });

    await newAd.save();
    res.json(newAd);

  } catch (err) {
  console.error( err);
}
};

exports.deleteAd = async (req, res) => {
  try{
    const chosen = await Ad.findById(req.params.id);
    if (!chosen) return res.status(404).json({ message: "Ad not found" });
    removeImage(path.join('public/uploads', chosen.img));
    const delAd = await chosen.deleteOne();
    res.json(delAd);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.editAd = async (req, res) => {
  try{
    const chosen = await Ad.findById(req.params.id);
    chosen.title = req.body.title;
    chosen.content = req.body.content;
    chosen.date = req.body.date;
    chosen.price = req.body.price;
    chosen.location = req.body.location;
    chosen.phone = req.body.phone;
    if (req.file) {
      removeImage(path.join('public/uploads', chosen.img));
      chosen.img = req.file.filename;
    }
    await chosen.save();
    res.json(chosen);
  }
  catch(err) {
    if (req.file) removeImage(req.file.path);
    res.status(500).json(err);
  }
};
