import './base.css';
import './style.css';
import logo from './yummly.svg';
import { getLike } from './apis/likes.js';
/* eslint-disable import/no-cycle */
import {
  getCurrentPosts,
  defaultFood,
  searchFood,
  handleNextBtn,
  handlePrevBtn,
  handlePageBtn,
} from './apis/food.js';
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
const nextBtn = document.querySelectorAll('.next-btn');
const prevBtn = document.querySelectorAll('.prev-btn');
let term = search.value;
const postsPerPage = 10;

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

// Get Default Meals
const getDefaultMeals = () => {
  if (defaultFood()) {
    defaultTemplate(defaultFood(), mealsEl, getLike(), resultHeading);
  } else if (searchFood(term)) {
    template(searchFood(term), mealsEl, resultHeading);
  }
};

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

prevBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    handlePrevBtn();
    if (searchFood(term)) {
      template(searchFood(term), mealsEl, resultHeading);
    } else if (defaultFood()) {
      defaultTemplate(defaultFood(), mealsEl, getLike(), resultHeading);
    }
  });
});

nextBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    handleNextBtn();
    if (searchFood(term)) {
      template(searchFood(term), mealsEl, resultHeading);
    } else if (defaultFood()) {
      defaultTemplate(defaultFood(), mealsEl, getLike(), resultHeading);
    }
  });
});

export default (meals, currentPage) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(meals.length / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }
  const page = document.querySelector('.page');
  page.innerHTML = '';
  const ul = document.createElement('ul');
  ul.classList.add('inline-flex');
  pageNumbers.forEach((number) => {
    const li = document.createElement('li');
    li.classList.add('page-item');
    if (number === currentPage) {
      li.classList.add('active');
    }
    li.innerHTML = `<a class="page-link bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">${number}</a>`;
    li.addEventListener('click', (e) => {
      e.preventDefault();
      handlePageBtn(number);
      if (searchFood(term)) {
        template(searchFood(term), mealsEl, resultHeading);
      } else if (defaultFood()) {
        defaultTemplate(defaultFood(), mealsEl, getLike(), resultHeading);
      }
    });

    ul.appendChild(li);
  });
  page.appendChild(ul);
};
