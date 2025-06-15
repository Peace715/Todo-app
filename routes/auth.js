const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
  res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
  successRedirect: '/tasks',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/login');
  });
});

module.exports = router;
