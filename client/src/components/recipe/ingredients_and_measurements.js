import React, { useState } from "react"
import { useIngredientsList, useFullRecipe } from "../../hooks"

function IngredientsAndMeasurements(props) {
  const { pickedItem, deleteItem } = useIngredientsList()
  const { finalIngredient, fullRecipe } = useFullRecipe()
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
  const [active, setActive] = useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    var newPicked = pickedItem.filter(function(el) {
      return el.name !== name
    })

    deleteItem(newPicked)
  }
  console.log(amount)
  // function to finalize the ingregient creation
  function handleFinalize(e) {
    e.preventDefault()
    if (amount.Amount == undefined) {
      alert("please specify amount of ingredient")
    } else {
      finalIngredient(amount)
      setActive(true)
    }
  }
  console.log(fullRecipe)

  var string = JSON.stringify(pickedItem)
  const uniqueArray = pickedItem.filter(
    (object, index) =>
      index ===
      pickedItem.findIndex(
        obj => JSON.stringify(obj) === JSON.stringify(object)
      )
  )
  console.log("unique:", uniqueArray)

  return (
    <div className="IandMContainer">
      <div className="ingredientsAndMeasurements">
        <div className="ingredientsTitlething">Ingredients</div>
        <label htmlFor="measurement">Measurements</label>
      </div>
      {uniqueArray.map((item, i) => (
        <div key={i} className="measurementDisplay">
          <div className="IandMName">{item.name}</div>
          <div className="measurementBox">
            <div className="measurementForms">
              {fullRecipe.find(i => i.ingredientName === item.name) ? (
                ""
              ) : (
                <div className="measurementForms">
                  <form
                    className="measurementFormsOne"
                    onSubmit={handleFinalize}
                  >
                    <input
                      type="text"
                      name="measurement"
                      placeholder="ex. 2 1/2 cups flour"
                      onChange={e =>
                        setAmount({
                          Amount: e.target.value,
                          IngredientName: item.name,
                          active: true
                        })
                      }
                    />
                    <button type="submit">Confirm Ingredient</button>
                  </form>
                  <form className="measurementFormsTwo" onSubmit={handleSubmit}>
                    <button type="submit" onClick={e => setName(item.name)}>
                      Remove Ingredient
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {fullRecipe.map((item, i) => {
        return <div key={i}>{item.measurement}</div>
      })}
    </div>
  )
}
export default IngredientsAndMeasurements