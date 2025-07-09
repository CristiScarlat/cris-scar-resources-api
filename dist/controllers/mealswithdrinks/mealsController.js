"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMealsByArea = exports.getMealsByCategory = exports.getAllMealIngredients = exports.getAllMealAreas = exports.getAllMealCategories = exports.getMealById = exports.getLatestMeals = exports.searchMealsByIngredients = exports.searchMealsByName = void 0;
const baseURL = `https://www.themealdb.com/api/json/v2/${process.env.MEAL_DB_APP_KEY}`;
const searchMealsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.body.name;
    if (searchTerm) {
        const response = yield fetch(`${baseURL}/search.php?s=${searchTerm}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json({ data });
    }
    else {
        return res.status(400).json({ error: "Name of the searched meal is missing!" });
    }
});
exports.searchMealsByName = searchMealsByName;
const searchMealsByIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = req.body.ingredients;
    if (ingredients) {
        const response = yield fetch(`${baseURL}/filter.php?i=${ingredients.join()}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json({ data });
    }
    else {
        return res.status(400).json({ error: "Ingredient is missing!" });
    }
});
exports.searchMealsByIngredients = searchMealsByIngredients;
const getLatestMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseURL}/latest.php`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json({ data });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getLatestMeals = getLatestMeals;
const getMealById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mealId = req.params.id;
        const response = yield fetch(`${baseURL}/lookup.php?i=${mealId}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json(Object.assign({}, data));
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getMealById = getMealById;
const getAllMealCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseURL}/list.php?c=list`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json({ categories: data.meals.map((item) => item.strCategory) });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getAllMealCategories = getAllMealCategories;
const getAllMealAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseURL}/list.php?a=list`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json({ areas: data.meals.map((item) => item.strArea) });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getAllMealAreas = getAllMealAreas;
const getAllMealIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseURL}/list.php?i=list`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json({ ingredients: data.meals });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getAllMealIngredients = getAllMealIngredients;
const getMealsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const response = yield fetch(`${baseURL}/filter.php?c=${category}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json(Object.assign({}, data));
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getMealsByCategory = getMealsByCategory;
const getMealsByArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const area = req.params.area;
        const response = yield fetch(`${baseURL}/filter.php?a=${area}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = yield response.json();
        return res.json(Object.assign({}, data));
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getMealsByArea = getMealsByArea;
//# sourceMappingURL=mealsController.js.map