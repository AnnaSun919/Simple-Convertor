import React, { useEffect, useState } from "react";
function Measurement() {
  const [formValues, setFormValues] = useState([
    { ingredient: "", quantity: "" },
  ]);

  const [recipe, setrecipe] = useState([]);
  useEffect(() => {}, [recipe]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { ingredient: "", quantity: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    const {
      container1Size1,
      container1Size2,
      container2Size1,
      container2Size2,
    } = event.target;
    const firstContainerSize = container1Size1.value * container1Size2.value;
    const secondContainerSize = container2Size1.value * container2Size2.value;
    const times = secondContainerSize / firstContainerSize;

    formValues.map((elem) => {
      setrecipe((prev) => [
        ...prev,
        {
          ingredient: elem.ingredient,
          quantity: elem.quantity * times,
        },
      ]);
      return 0;
    });
  };

  console.log(recipe);

  return (
    <>
      <h1>Convertor</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label>Container1: </label>
          <input type="text" name="container1Size1" /> cm *
          <input type="text" name="container1Size2" /> cm
        </div>
        <span>Convert to </span>
        <div className="container">
          <label>Container 2: </label>{" "}
          <input type="text" name="container2Size1" /> cm *
          <input type="text" name="container2Size2" /> cm
        </div>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Ingredient</label>
            <input
              type="text"
              name="ingredient"
              value={element.ingredient || ""}
              onChange={(e) => handleChange(index, e)}
            />
            <label>Quantity</label>
            <input
              type="text"
              name="quantity"
              value={element.quantity || ""}
              onChange={(e) => handleChange(index, e)}
            />
            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <button
            className="button add"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button>
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      {recipe &&
        recipe.map((elem) => (
          <div className="recipe">
            <h1>New Measurement</h1>
            Ingredient :<span>{elem.ingredient}</span>
            <span>{elem.quantity}</span>g
          </div>
        ))}
    </>
  );
}

export default Measurement;
