"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
//# sourceMappingURL=meals.js.map