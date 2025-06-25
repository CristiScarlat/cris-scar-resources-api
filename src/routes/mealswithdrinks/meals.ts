import express from 'express';
const router = express.Router();
const mealsController = require('../../controllers/mealswithdrinks/mealsController');

router.post('/search-by-name', mealsController.searchMealsByName);
router.post('/search-by-ingredient', mealsController.searchMealsByIngredients);
router.get('/latest', mealsController.getLatestMeals);
router.get('/categories', mealsController.getAllMealCategories);
router.get('/areas', mealsController.getAllMealAreas);
router.get('/ingredients', mealsController.getAllMealIngredients);
router.get('/:id', mealsController.getMealById);
router.get('/by-category/:category', mealsController.getMealsByCategory);
router.get('/by-area/:area', mealsController.getMealsByArea);


module.exports = router;
