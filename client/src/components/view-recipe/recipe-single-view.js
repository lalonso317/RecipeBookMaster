import React from "react"
import { Link } from "react-router-dom"
import Burrito from "../../Assets/Burrito.jpeg"
const ViewRecipeSingle = props => {
  return (
    <div>
      <div>Single Recipe Page</div>
      <div>
        <Link to={"/"}>
          <button>Back to Home</button>
        </Link>
        <Link to={"/recipe-multi-view"}>
          <button>Back to Recipes</button>
        </Link>
      </div>
      <div className="single-recipe-view-container">
        <p className="single-recipe-title">Recipe Name</p>
        <p className="single-recipe-creator">Created by Recipe Creator</p>
        <div className="single-recipe-image">
          <img src={Burrito} width="600px" />
        </div>
        <div className="single-recipe-ingredients">
          <p>Ingredients</p>
          <div className="single-recipe-ingredients-list">1</div>
          <div className="single-recipe-ingredients-list">2</div>
          <div className="single-recipe-ingredients-list">3</div>
          <div className="single-recipe-ingredients-list">4</div>
        </div>
        <div className="single-recipe-directions">
          <p>Directions</p>
          <div className="single-recipe-directions-list">1</div>
          <div className="single-recipe-directions-list">2</div>
          <div className="single-recipe-directions-list">3</div>
          <div className="single-recipe-directions-list">4</div>
        </div>
      </div>
    </div>
  )
}

export default ViewRecipeSingle
