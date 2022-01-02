import { postComment } from '../apis/index.js';

export default async (modal, meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i += 1) {
    // Check if ingredient exists
    if (meal[`strIngredient${i}`]) {
      // Add ingredient to array
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
      );
    } else {
      break;
    }
  }
  modal.innerHTML = `
    <div class="max-w-7xl mx-auto relative transition-all duration-1000 ease-out">
    <div class="max-w-4xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto  md:mb-8 mt-0 transition-all duration-1000 ease-out">
      <div class="recipe-summary wrapper md:mt-8 flex flex-col-reverse w-full align-center justify-between md:flex-row">
        <div class="recipe-details">
          <div class="primary-info-text">
            <div class="primary-info-left-wrapper">
              <h2 class="recipe-title font-bold text-xl md:text-4xl mt-0 mb-4 sm:w-full md:mb-8 font-sans w-80">
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
            `,
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
      
      <h2 class="comment-count-header">Commment (0) </h2>
      <ul class="comment-display">
    
      </ul>
      
      <h2 class="comment-header">Add Comment</h2>
      <form>
      <input type="text" class="username" placeholder = "Your name" required/>
      <textarea placeholder="Your comment" class="comment" required></textarea>
      <input type="submit" class="submitBtn" value="Comment" />
   </form>
     
     
    </div>
  </div>`;

  modal.parentElement.classList.add('showRecipe');
  const btn = document.querySelector('.submitBtn');
  const username = document.querySelector('.username');
  const comment = document.querySelector('.comment');
  const commentCount = document.querySelector('.comment-count-header');
  const ul = document.querySelector('.comment-display');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (username.value.trim() === '') return;
    if (comment.value.trim() === '') return;

    const userVal = username.value;
    const commentVal = comment.value;
    const id = meal.idMeal;
    const post = { item_id: id, username: userVal, comment: commentVal };
    btn.value = 'Processing...';
    btn.disabled = true;
    await postComment(post);
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XkZb08sfqWimSB3Sqtb3/comments?item_id=${id}`,
    );
    const comments = await response.json();

    ul.innerHTML = '';
    comments.forEach((comPost) => {
      ul.innerHTML += `
          
        <li><p>${comPost.creation_date}</p><p>${comPost.username}</p><p>${comPost.comment}</p></li>
    `;
      commentCount.innerHTML = '';

      commentCount.innerHTML = `Comments (${comments.length})`;
      btn.value = 'Comment';
      btn.disabled = false;
      username.value = '';
      comment.value = '';
    });
  });

  const response = await fetch(
    `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XkZb08sfqWimSB3Sqtb3/comments?item_id=${meal.idMeal}`,
  );
  const comments = await response.json();

  if (!comments.length) return;

  comments.forEach((comPost) => {
    ul.innerHTML += `
      
    <li><p>${comPost.creation_date}</p><p>${comPost.username}</p><p>${comPost.comment}</p></li>
`;
    commentCount.innerHTML = '';

    commentCount.innerHTML = `Comments (${comments.length})`;
  });
};
