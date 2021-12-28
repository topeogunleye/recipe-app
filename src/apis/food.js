import { paginate } from '../index.js';

let meals = [];
let currentPosts = [];
let currentPage = 1;
const postsPerPage = 10;

// Get current posts
let indexOfLastPost = currentPage * postsPerPage;
let indexOfFirstPost = indexOfLastPost - postsPerPage;
const showingNumbers = document.querySelector('.showing-numbers');
const mealsCounter = document.getElementById('meals-counter');

// Get length of meals
const getMealsLength = (meals, currentPosts) => {
  const totalMeals = meals.length;
  showingNumbers.innerHTML = `  <p class="text-sm text-gray-700">
  Showing
  <span class="font-medium">${indexOfFirstPost + 1}</span>
  to
  <span class="font-medium">${currentPosts.length >= 10 ? indexOfLastPost : totalMeals}</span>
  of
  <span class="font-medium">${totalMeals}</span>
  meals
</p>`;
  mealsCounter.innerHTML = `<p class="text-sm font-bold text-gray-700">${totalMeals} meals</p>`;
};

export const getCurrentPosts = async () => {
  currentPosts = meals.slice(indexOfFirstPost, indexOfLastPost);
  return currentPosts;
};

export const searchFood = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`,
  );
  const data = await response.json();
  meals = data.meals;
  getMealsLength(meals, currentPosts);
  currentPosts = getCurrentPosts();
  paginate(meals, currentPage);
  return currentPosts;
};

export const defaultFood = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  );
  const data = await response.json();
  meals = data.meals;
  currentPosts = getCurrentPosts();
  getMealsLength(meals, currentPosts);
  paginate(meals, currentPage);
  return getCurrentPosts();
};

export const handlePrevBtn = () => {
  if (currentPage > 1) {
    currentPage -= 1;
  }
  indexOfLastPost = currentPage * postsPerPage;
  indexOfFirstPost = indexOfLastPost - postsPerPage;
  getCurrentPosts();
  getMealsLength(meals, currentPosts);
};

export const handleNextBtn = () => {
  if (currentPage < Math.ceil(meals.length / postsPerPage)) {
    currentPage += 1;
  }

  indexOfLastPost = currentPage * postsPerPage;
  indexOfFirstPost = indexOfLastPost - postsPerPage;
  getCurrentPosts();
  getMealsLength(meals, currentPosts);
};

export const handlePageBtn = (page) => {
  currentPage = page;
  indexOfLastPost = currentPage * postsPerPage;
  indexOfFirstPost = indexOfLastPost - postsPerPage;
  getCurrentPosts();
  getMealsLength(meals, currentPosts);
};
