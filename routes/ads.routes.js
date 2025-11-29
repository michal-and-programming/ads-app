const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const upload = require('../utils/imageUpload');

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.loadAll);
router.get('/ads/:id', ads.loadChosen);
router.get('/ads/search/:searchPhrase', ads.searchAd);
router.post('/ads',authMiddleware,upload.single("photo"), ads.addNewAd);
router.delete('/ads/:id',authMiddleware, ads.deleteAd);
router.patch('/ads/:id',authMiddleware,upload.single("photo"), ads.editAd);

module.exports = router;