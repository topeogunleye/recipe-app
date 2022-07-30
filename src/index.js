import './base.css';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

import logo from './yummly.svg';

//get img tag and set src attribute
const myLogo = document.querySelector('.logoYummy');
myLogo.setAttribute('src', logo);

const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  modal = document.getElementById('single-meal');

/*
 * @param {string} str
 * @returns {string}
 */
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
    console.log(data.meals);

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

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
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

  modal.innerHTML = `
  <div class="max-w-7xl mx-auto relative transition-all duration-1000 ease-out">
  <div class="max-w-4xl md:max-w-2xl lg:max-w-4xl lg:pl-44 xl:max-w-5xl mx-auto xl:pl-32  md:mb-8 mt-0 transition-all duration-1000 ease-out">
    <div class="recipe-summary wrapper md:mt-8 flex flex-col-reverse w-full align-center justify-between md:flex-row">
      <div class="recipe-details">
        <div class="primary-info-text">
          <div class="primary-info-left-wrapper">
            <h2 class="recipe-title font-bold text-xl md:text-4xl mt-0 ml-2 mb-4 sm:w-full md:mb-8 font-sans w-80">
              ${meal.strMeal}
            </h2>
          </div>
        </div>
        <div class="summary-item-wrapper flex relative justify-center md:justify-start">
          <div class="recipe-summary-item  text-4xl flex flex-col w-28 border-r border-gray-400  justify-center items-center">
            <span class="value font-light text-4xl h-12">
              ${ingredients.length}
            </span>
            <span class="unit font-normal text-sm leading-3">
              Ingredients
            </span>
          </div>
          <div class="recipe-summary-item unit text-4xl flex flex-col w-36 border-r border-gray-400 justify-center items-center">
            <span class="value font-light text-4xl h-12">
              25
            </span>
            <span class="unit font-normal text-sm leading-3">
              Minutes
            </span>
          </div>
          <div class="recipe-summary-item nutrition text-4xl flex flex-col w-36 justify-center items-center">
            <span class="value font-light text-4xl h-12">
              210
            </span>
            <span class="unit font-normal text-sm leading-3">
              Calories
            </span>
          </div>
        </div>

        <div class="main mt-6 text-center md:text-justify m-8">
          <h2 class="h-8 text-center md:text-justify font-bold">
            Ingredients
          </h2>
          <ul class="single-meal-ul w-11/12 mx-auto md:mx-0">
          ${ingredients
            .map(
              (ing) => `
            <li
              class="single-meal-ul-li"
              id={uuidv4()}
            >
              ${ing}
            </li>
          `
            )
            .join('')}
          </ul>
        </div>
      </div>
      <div class="recipe-details-image w-full mobile-div relative">
        <img
          alt=${meal.strMeal}
          src=${meal.strMealThumb}
          class="recipe-image w-11/12 mx-auto md:max-w-full rounded-lg md:rounded-lg mobile"
        />
      </div>
    </div>
    <p class="single-meal-p w-11/12 m-auto md:mt-6 list-none pb-20 pt-10">
      ${meal.strInstructions}
    </p>
  </div>
</div>`;
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
    console.log(mealID);
    getMealById(mealID);
  }
});
