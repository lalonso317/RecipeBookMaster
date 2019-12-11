const express = require("express")
const Recipe = require("../models/recipe")
// const Update = require("../models/update")
const router = express.Router()
const faker = require("faker")
const axios = require("axios")
// Submits a recipe

router.post("/api/Recipe", (req, res) => {
  Recipe.create(req.body).then(function(recipe) {
    res.send(recipe)
  })
})
// Gets all the recipes
router.get("/api/Recipe", async (req, res) => {
  const recipe = await Recipe.find()
  res.json(recipe)
  // console.log("all recipes ===========---->>>>", recipe)
})

// submits updated recipes
// router.post("/api/update-recipe", (req, res) => {
//   const id = req.body._id
//   const Id = "5deae23563d545400786bf60"
//   const name = { name: "butthole" }
//   Recipe.findByIdAndUpdate(Id, name).then(resp => {
//     console.log(resp)
//   })
//   res.json({
//     message: "success"
//   })
//   console.log("thanks")
// })
router.post("/api/update-recipe", (req, res) => {
  const Id = "5deae23563d545400786bf60"
  const names = { name: "butthole" }
  Recipe.findById(req.body.recId)
    .then(recipe => {
      recipe.recipeHeaderInfo.category = req.body.recipeHeaderInfo.category
      recipe.recipeHeaderInfo.name = req.body.recipeHeaderInfo.name
      recipe.recipeHeaderInfo.description =
        req.body.recipeHeaderInfo.description
      recipe.fullRecipe.ingredients = req.body.fullRecipe.ingredients
      recipe.directions = req.body.directions
      recipe.isChecked = req.body.isChecked
      recipe.username = req.body.username
      recipe.RecipeImages = req.body.RecipeImages
      recipe.save()
      // .catch(err => res.status(400).json("error: " + err))
    })
    .then(resp => {
      console.log("updated")
    })

  res.json({
    message: "butthole"
  })
})

// adds comments to the recipe objects

router.post("/api/addedComment", (req, res) => {
  Recipe.findById(req.body.id)
    .then(recipe => {
      recipe.update({
        ...recipe,
        ["comments"]: [...recipe.comments, req.body.comment],
        ["_id"]: req.body.id
      })
      // recipe.comments = [...recipe.comments, req.body.comment]
      recipe.save()
    })
    .then(resp => {
      console.log("updated")
    })

  res.json({
    message: "butthole"
  })
})

// test to update just the comments in the recipe object that is selected by the id

// router.post("/api/test-update-comments", (req, res) => {
//   id = "5deeee9442effc77a064be31"
//   comment = [{ text: "this is a comment" }]
//   Recipe.findOneAndUpdate({ _id: id }, { $set: comment }, function(recipe) {
//     console.log(res)
//     console.log(comment)
//   })
//   console.log(res)
//   res.json({
//     message: res
//   })
// })

// gets the uploaded images
router.post("/getImages", (req, res) => {
  const url = req.body.url
  axios.get(url).then(resp => {
    const response = resp.data
    res.json(response)
  })
})

router.get("/recipe/:recipeId", async (request, response) => {
  let recipeId = request.params.recipeId
  const recipe = await Recipe.find({ _id: recipeId })
  response.json(recipe)
})

module.exports = router
