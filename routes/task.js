const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', isLoggedIn, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.render('dashboard', { user: req.user, tasks });
});

router.post('/add', isLoggedIn, async (req, res) => {
  await Task.create({ title: req.body.title, user: req.user._id });
  res.redirect('/tasks');
});

router.post('/complete/:id', isLoggedIn, async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { status: 'completed' });
  res.redirect('/tasks');
});

router.post('/delete/:id', isLoggedIn, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect('/tasks');
});

module.exports = router;
