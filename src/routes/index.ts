const express = require('express');
const router = express.Router();

const mealsRoutes = require('./mealswithdrinks/meals');
const drinksRoutes = require('./mealswithdrinks/drinks');
const iRadioRoutes = require("./iRadio/iRadio")


router.use('/mealswithdrinks/meals', mealsRoutes);
//router.use('/mealswithdrinks/drinks', drinksRoutes);
router.use('/iradio', iRadioRoutes);

module.exports = router;