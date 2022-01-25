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
    console.log("works");
    event.preventDefault();
    setrecipe([]);
    const {
      container1Size1,
      container1Size2,
      container2Size1,
      container2Size2,
    } = event.target;

    const firstContainerSize = container1Size1.value * container1Size2.value;
    const secondContainerSize = container2Size1.value * container2Size2.value;
    const times = secondContainerSize / firstContainerSize;
    if (formValues && firstContainerSize && secondContainerSize) {
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
    } else {
      return;
    }
  };

  console.log(recipe.length > 0);
  return (
    <>
      <h1>Convertor</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h2>Container Size :</h2>
          <div className="container_item size">
            <label>From : </label>
            <input type="text" name="container1Size1" /> cm *
            <input type="text" name="container1Size2" /> cm
            <label> To : </label> <input type="text" name="container2Size1" />{" "}
            cm *
            <input type="text" name="container2Size2" /> cm
          </div>
          <h2>Ingredient :</h2>
          {formValues.map((element, index) => (
            <div className="container_item">
              <div className="form-inline" key={index}>
                <div className="form_elem">
                  <label>Ingredient</label>
                  <input
                    type="text"
                    name="ingredient"
                    value={element.ingredient || ""}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="form_elem">
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
                      id="button_remove"
                      onClick={() => removeFormFields(index)}
                    >
                      -
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          <div className="button-section">
            <button
              className="button add"
              type="button"
              onClick={() => addFormFields()}
            >
              Add Ingredient
            </button>
            <button className="button submit" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>

      <div className="recipe">
        {recipe.length > 0 && (
          <div className="container">
            <h1>New Measurement</h1>
            <h2>Ingredient :</h2>
            {recipe.map((elem) => (
              <div className="ingredient">
                <span>{elem.ingredient}</span>
                <span>{elem.quantity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Measurement;
