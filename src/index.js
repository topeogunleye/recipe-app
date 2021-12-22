import './base.css';
import './style.css';
import logo from './yummly.svg';

//get img tag and set src attribute
const myLogo = document.querySelector('.logoYummy');
myLogo.setAttribute('src', logo);

const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  modal = document.getElementById('single-meal');

// Search meal and fetch data
const searchMeal = async (e) => {
  e.preventDefault();

  // Get search term
  const term = search.value;

  // Check if there is a search term
  if (term.trim()) {
    // Change HTML
    resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;
    mealsEl.innerHTML = '<p class="text-center">Loading...</p>';

    // Get response from API
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );

    const data = await res.json();

    if (data.meals === null) {
      resultHeading.innerHTML = `<p>There are no search results. Try again</p>`;
      mealsEl.innerHTML = '';
    } else {
      mealsEl.innerHTML = data.meals
        .map(
          (meal) => `
      <div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img"/>
        <div class="m-4 meal-info">
        <div class="title-likes">
          <span class="font-bold meal-title">${
            meal.strMeal.length > 14
              ? meal.strMeal.slice(0, 14) + '...'
              : meal.strMeal
          } </span>
          <span class="likes">10</span>
        </div>
        <div class="comment-like">
          <button class="meal-btn" data-mealID="${
            meal.idMeal
          }">Comments<svg class="meal-svg" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style=""><path d="M0 0L3 3L0 6"></path></svg>
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="6" height="6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>

        </div>
      </div>
      </div>

      `
        )
        .join('');
    }
  } else {
    alert('Please enter a search term');
  }
};

// Fetch meal by ID
function getMealById(mealID) {
  console.log(mealID);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addRecipeModal(meal);
    });
}

// Add meal to DOM
function addRecipeModal(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    // Check if ingredient exists
    if (meal[`strIngredient${i}`]) {
      // Add ingredient to array
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  modal.innerHTML = ``
}

// Event listeners
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-btn');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
