const baseURL = `https://www.themealdb.com/api/json/v2/${process.env.MEAL_DB_APP_KEY}`;

export const searchMealsByName = async (req, res) => {
    const searchTerm = req.body.name;
    if (searchTerm) {
        const response = await fetch(`${baseURL}/search.php?s=${searchTerm}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json();
        return res.json({ data });
    }
    else {
        return res.status(400).json({ error: "Name of the searched meal is missing!" })
    }

}

export const searchMealsByIngredients = async (req, res) => {
    const ingredients = req.body.ingredients;
    if (ingredients) {
        const response = await fetch(`${baseURL}/filter.php?i=${ingredients.join()}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json();
        return res.json({ data });
    }
    else {
        return res.status(400).json({ error: "Ingredient is missing!" })
    }
}

export const getLatestMeals = async (req, res) => {
    try {
        const response = await fetch(`${baseURL}/latest.php`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json()
        return res.json({ data });
    } catch (error) {
        return res.status(500).json({ error })
    }

}

export const getMealById = async (req, res) => {
    try {
        const mealId = req.params.id;
        const response = await fetch(`${baseURL}/lookup.php?i=${mealId}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });

        const data = await response.json()
        return res.json({ ...data });
    }
    catch (error) {
        return res.status(500).json({ error })
    }

}

export const getAllMealCategories = async (req, res) => {
    try {
        const response = await fetch(`${baseURL}/list.php?c=list`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json()
        return res.json({ categories: data.meals.map((item: { strCategory: string }) => item.strCategory) });
    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const getAllMealAreas = async (req, res) => {
    try {
        const response = await fetch(`${baseURL}/list.php?a=list`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json()
        return res.json({ areas: data.meals.map((item: { strArea: string }) => item.strArea) });
    }
    catch (error) {
        return res.status(500).json({ error })
    }

}

export const getAllMealIngredients = async (req, res) => {
    try {
        const response = await fetch(`${baseURL}/list.php?i=list`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json()
        return res.json({ ingredients: data.meals });
    }
    catch (error) {
        return res.status(500).json({ error })
    }

}

export const getMealsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const response: Response = await fetch(`${baseURL}/filter.php?c=${category}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json()
        return res.json({ ...data });
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}

export const getMealsByArea = async (req, res) => {
    try {
        const area = req.params.area;
        const response: Response = await fetch(`${baseURL}/filter.php?a=${area}`, {
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'cache'
            }
        });
        const data = await response.json()
        return res.json({ ...data });
    }
    catch (error) {
        return res.status(500).json({ error })
    }
}
