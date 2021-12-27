import './base.css';
import './style.css';
import logo from './yummly.svg';
import { getLike } from './apis/likes.js';
import { getCurrentPosts, defaultFood, searchFood, handleNextBtn, handlePrevBtn } from './apis/food.js';
import template from './template.js';
import defaultTemplate from './defaultTemplate.js';
import modalPopUp from './modal/index.js';
// get img tag and set src attribute
const myLogo = document.querySelector('.logoYummy');
myLogo.setAttribute('src', logo);

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const modal = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const pageItem = document.querySelectorAll('.page-item');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let term = search.value;

// Search meal and fetch data
const searchMeal = async (e) => {
  e.preventDefault();

  // Get search term
  term = search.value;
  if (term.trim() === '') return;
  resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;
  mealsEl.innerHTML = '<p class="text-center">Loading...</p>';
  searchFood(term);
  template(searchFood(term), mealsEl, resultHeading);
};

// // Get Default meals
// const getDefaultMeals = () => {
//   defaultTemplate(defaultFood(), mealsEl, getLike(), resultHeading);
//   // if handleNextBtn is called, get defaultFood
//   if (handleNextBtn) {
//     defaultTemplate(getCurrentPosts(), mealsEl, getLike(), resultHeading);
//   }
// };

// Get Default Meals
const getDefaultMeals = () => {
  if (defaultFood()) {
    defaultTemplate(defaultFood(), mealsEl, getLike(), resultHeading);
  } else  if (searchFood(term)) {
    template(searchFood(term), mealsEl, resultHeading);
  }

}

// Event listeners
submit.addEventListener('submit', searchMeal);

// load default meals on DOM load
window.addEventListener('DOMContentLoaded', getDefaultMeals);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-btn');
    }
    return false;
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getCurrentPosts().then((data) => {
      const meal = data.find((meal) => meal.idMeal === mealID);
      modalPopUp(modal, meal);
    });
  }
});


recipeCloseBtn.addEventListener('click', () => {
  modal.parentElement.classList.remove('showRecipe');
});

getLike();

prevBtn.addEventListener('click', ()=> {
  handlePrevBtn()
})

nextBtn.addEventListener('click', ()=> {
  handleNextBtn();
})



