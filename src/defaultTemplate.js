/* eslint-disable import/no-cycle */
import { getMealsLength } from './apis/food.js';

export default async (defaultFood, mealsEl, getLike, resultHeading) => {
  const meals = await defaultFood;

  const likesPost = await getLike;

  if (meals === null) {
    resultHeading.innerHTML = '<p>There are no search results. Try again</p>';
    mealsEl.innerHTML = '';
  } else {
    mealsEl.innerHTML = meals
      .slice(0, 20)
      .map(
        (meal, index) => `
      <div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img"/>
        <div class="m-4 meal-info">
        <div class="title-likes">
          <span class="font-bold meal-title">${
  meal.strMeal.length > 14
    ? `${meal.strMeal.slice(0, 14)}...`
    : meal.strMeal
} </span>
 
    
      <span class="likes" like-id =${index}>
        ${likesPost[index].likes}
      </span>
      
        </div>
        <div class="comment-like">
          <button class="meal-btn" data-mealID="${
  meal.idMeal
}">Comments<svg class="meal-svg" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style=""><path d="M0 0L3 3L0 6"></path></svg>
          </button>
          <i class="fas fa-heart" id=${index}></i>
  
        </div>
      </div>
      </div>
  
      `,
      )
      .join('');
    getMealsLength();
  }

  const hearts = document.querySelectorAll('.fa-heart');
  const likeContainer = document.querySelectorAll('.likes');

  hearts.forEach((heart, index) => {
    heart.addEventListener('click', async (e) => {
      const likeId = e.target.getAttribute('id');

      await fetch(
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/0KbvDeTm2dSbq5EIp5fq/likes',
        {
          method: 'POST',
          body: JSON.stringify({
            item_id: `${likeId}`,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );

      const response = await fetch(
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/0KbvDeTm2dSbq5EIp5fq/likes',
        {
          method: 'GET',

          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );

      const json = await response.json();

      likeContainer[index].innerText = json[index].likes;
    });
  });
};
