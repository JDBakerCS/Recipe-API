

const express = require('express');

const router = express.Router();

let recipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", minutes: 25, servings: 4, vegetarian: false },
  { id: 2, title: "Chana Masala", cuisine: "Indian", minutes: 35, servings: 4, vegetarian: true },
  { id: 3, title: "Fish Tacos", cuisine: "Mexican", minutes: 20, servings: 3, vegetarian: false },
  { id: 4, title: "Margherita Pizza", cuisine: "Italian", minutes: 40, servings: 2, vegetarian: true },
  { id: 5, title: "Pad Thai", cuisine: "Thai", minutes: 30, servings: 2, vegetarian: false },
];

let nextId = 6;

function validateRecipe(req, res, next) {
  const {title, cuisine} = req.body;

  if(!title || !cuisine) {
    return res.status(400).json({
      error: "Title and cuisine are required",
    })
  }

  next();
}

router.get("/", (req, res, next) => {
  try {
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
  const recipeId = Number(req.params.id)

  const foundRecipe = recipes.find((recipe) => {
    return recipe.id === recipeId
  });

  if (!foundRecipe) {
    return res.status(404).json({
      error: "Recipe not found"
    })
  }
  res.json(foundRecipe);
  } catch (err) {
    next(err);
  }
})

router.post("/", validateRecipe, (req, res, next) => {
  try {
  const { title, cuisine, minutes, servings, vegetarian } = req.body;
  const newRecipe = {
    id: nextId,
    title: title,
    cuisine: cuisine,
    minutes: minutes,
    servings: servings,
    vegetarian: !!vegetarian
  };
  nextId++;
  
  recipes.push(newRecipe);
  
  res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
})

router.patch("/:id", (req, res, next) => {
  try {
  const recipeId = Number(req.params.id)
  const foundRecipe = recipes.find((recipe) => recipe.id === recipeId);
  
  if (!foundRecipe) {
    return res.status(404).json({ 
      error: "Recipe not found" 
    })
  }
  Object.assign(foundRecipe, req.body);
  
  res.status(200).json(foundRecipe);
} catch (err) {
  next (err)
}
})
router.delete("/:id", (req, res, next) => {
  try {
  const recipeId = Number(req.params.id)
  const recipeIndex = recipes.findIndex((recipe) => {
    return recipe.id === recipeId
  });
  if (recipeIndex === -1) {
    return res.status(404).json({ 
      error: "recipe not found",
    })
  }
  recipes.splice(recipeIndex, 1);
  
  res.sendStatus(204);
} catch (err) {
  next(err)
}
})


module.exports = router;