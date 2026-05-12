// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();

  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);

  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. Get the recipes from localStorage, or return an empty array if none exist
  return JSON.parse(localStorage.getItem("recipes")) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to the <main> element
  const main = document.querySelector("main");

  // A11. Create a <recipe-card> for each recipe and append it to <main>
  recipes.forEach((recipe) => {
    const card = document.createElement("recipe-card");
    card.data = recipe;
    main.append(card);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // B1. Convert the recipes array to a string and save it in localStorage
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2. Get a reference to the <form> element
  const form = document.querySelector("form");
  const main = document.querySelector("main");

  // B3. Add an event listener for the submit event
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // B4. Create a new FormData object from the form
    const formData = new FormData(form);

    // B5. Create a recipe object from the FormData key-value pairs
    const recipeObject = {};
    formData.forEach((value, key) => {
      recipeObject[key] = value;
    });

    // B6. Create a new <recipe-card> element
    const card = document.createElement("recipe-card");

    // B7. Add the recipeObject data to the <recipe-card>
    card.data = recipeObject;

    // B8. Append the new <recipe-card> to <main>
    main.append(card);

    // B9. Save the new recipe to localStorage
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });

  // B10. Get a reference to the "Clear Local Storage" button
  const clearButton = document.querySelector(".danger");

  // B11. Add a click event listener to the clear button
  clearButton.addEventListener("click", () => {
    // B12. Clear localStorage
    localStorage.clear();

    // B13. Delete the contents of <main>
    main.innerHTML = "";
  });
}
