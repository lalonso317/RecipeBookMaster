import React, { useState } from "react"
import { useFullRecipe } from "../../hooks"
import Icon from "../../lib/Icon"

const SetIngredients = props => {
  const [amount, setAmount] = useState("")
  const [d, setD] = useState("")

  const { finalIngredient, fullRecipe, remove } = useFullRecipe()

  const handleUserIngredients = e => {
    e.preventDefault()
    if (amount === "") {
      alert("Ingredient Cannot be Empty")
    } else {
      finalIngredient(amount)
      setAmount("")
    }
  }
  const handleClick = e => {
    e.preventDefault()
    remove(d)
  }

  return (
    <div className="bottom">
      <div className="directions">
        <label className="labelDirection">Ingredients & Measurements</label>
        <form onSubmit={e => handleUserIngredients(e)}>
          <div className="submitDirection">
            <input
              className="inputDirections"
              type="text"
              placeholder="Olive Oil 1-1/2 cups"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            ></input>
            <button type="submit" className="send">
              <Icon icon="arrow-right" />
            </button>
          </div>
        </form>
        <div className="direct">
          {fullRecipe.map((item, i) => (
            <div key={i}>
              <form
                className="individualDirections"
                onSubmit={e => handleClick(e)}
              >
                <p className="step"> {item.ingredientName}</p>
                <button
                  className="removeDirection"
                  type="submit"
                  onClick={e => setD(item.ingredientName)}
                >
                  {" "}
                  -{" "}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SetIngredients
