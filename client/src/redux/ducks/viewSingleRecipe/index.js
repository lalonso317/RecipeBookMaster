import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import Axios from "axios"

const GET_SINGLE_RECIPE = "recipe-view/GET_SINGLE_RECIPE"

const initialState = {
  single_recipe: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_RECIPE:
      return { ...state, single_recipe: action.payload }
    default:
      return state
  }
}

const getSingleRecipe = recipeId => {
  return dispatch => {
    Axios.get(`/recipe/${recipeId}`)
      .then(response => {
        const recipe_data = {
          recipe_id: response.data[0]._id,
          recipeTitle: response.data[0].recipeHeaderInfo.name,
          recipeCategory: response.data[0].recipeHeaderInfo.category,
          recipeDescription: response.data[0].recipeHeaderInfo.description,
          ingredients: response.data[0].fullRecipe.ingredients,
          directions: response.data[0].directions,
          private: response.data[0].isChecked,
          owner: response.data[0].user,
          RecipeImages: response.data[0].RecipeImages
        }
        dispatch({
          type: GET_SINGLE_RECIPE,
          payload: recipe_data
        })
      })
      .catch(error => {
        return {
          message: `something is wrong ===============>> ${error}`
        }
      })
  }
}

export const useSingleRecipe = (recipeId) => {
  const dispatch = useDispatch()
  const single_recipe = useSelector(
    appState => appState.singleRecipeState.single_recipe
  )

  useEffect(() => {
    dispatch(getSingleRecipe(recipeId))
  }, [dispatch, recipeId])

  return single_recipe
}