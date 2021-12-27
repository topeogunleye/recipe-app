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

export const getCurrentPosts = async () => {
  currentPosts = meals.slice(indexOfFirstPost, indexOfLastPost);
  getMealsLength(meals, currentPosts)
  console.log(currentPosts)
  return currentPosts;
};

export const searchFood = async (term) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const data = await response.json();
  meals = data.meals;  
  getMealsLength(meals, currentPosts);
  currentPosts = getCurrentPosts();
  paginate()
  return currentPosts;
};

export const defaultFood = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
  );
  const data = await response.json();
  meals = data.meals;
  currentPosts = getCurrentPosts();
  getMealsLength(meals, currentPosts);
  paginate();
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

const paginate = () => {
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
    li.addEventListener('click', () => {
      handlePageBtn(number);
    });

    ul.appendChild(li);
  });
  page.appendChild(ul);
};
