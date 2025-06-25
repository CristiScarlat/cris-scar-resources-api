const express = require('express');
const router = express.Router();

// Import specific resource routes
const mealsRoutes = require('./meals');
const drinksRoutes = require('./drinks');

// Mount them under /meals and /drinks
router.use('/meals', mealsRoutes);
//router.use('/drinks', drinksRoutes);

module.exports = router;