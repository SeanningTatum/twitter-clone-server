const express = require('express');
const router = express.Router();
const tweetsController = require('../controllers/tweets');

// GET Tweets
router.get('/', tweetsController.getTweets);

// Post a tweet
router.post('/', tweetsController.postTweet);

module.exports = router;
