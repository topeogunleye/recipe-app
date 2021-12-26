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
  <span class="font-medium">1</span>
  to
  <span class="font-medium">${currentPosts.length}</span>
  of
  <span class="font-medium">${totalMeals}</span>
  meals
</p>`;
  mealsCounter.innerHTML = `<p class="text-sm font-bold text-gray-700">${currentPosts.length} meals</p>`;
};

const getCurrentPosts = () => {
  currentPosts = meals.slice(indexOfFirstPost, indexOfLastPost);

  return currentPosts;
};

export const searchFood = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`,
  );
  const data = await response.json();
  meals = data.meals;
  currentPosts = getCurrentPosts();
  getMealsLength(meals, currentPosts);

  return currentPosts;
};

export const defaultFood = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken',
  );
  const data = await response.json();
  meals = data.meals;
  currentPosts = getCurrentPosts();
  getMealsLength(meals, currentPosts);
  return getCurrentPosts();
};

export const handlePrevBtn = () => {
  if (currentPage > 1) {
    currentPage -= 1;
  }
  indexOfLastPost = currentPage * postsPerPage;
  indexOfFirstPost = indexOfLastPost - postsPerPage;
  getCurrentPosts();
};

export const handleNextBtn = () => {
  if (currentPage < Math.ceil(meals.length / postsPerPage)) {
    currentPage += 1;
  }
  indexOfLastPost = currentPage * postsPerPage;
  indexOfFirstPost = indexOfLastPost - postsPerPage;
  getCurrentPosts();
};

export const handlePageBtn = (page) => {
  currentPage = page;
  indexOfLastPost = currentPage * postsPerPage;
  indexOfFirstPost = indexOfLastPost - postsPerPage;
  getCurrentPosts();
};

export const paginate = (meals) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(meals.length / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }
  const page = document.querySelector('.page');
  const ul = document.createElement('ul');
  pageNumbers.forEach((number) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = number;
    li.appendChild(a);
    ul.appendChild(li);
  });
  page.appendChild(ul);
};
