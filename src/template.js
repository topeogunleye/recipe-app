/* eslint-disable import/no-cycle */
import { getMealsLength } from './apis/food.js';

export default async (searchFood, mealsEl, resultHeading) => {
  // Change HTML
  searchFood.then((meals) => {
    if (meals === null) {
      resultHeading.innerHTML = '<p>There are no search results. Try again</p>';
      mealsEl.innerHTML = '';
    } else {
      mealsEl.innerHTML = meals
        .map(
          (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${
  meal.strMeal
}" class="meal-img"/>
              <div class="m-4 meal-info">
              <div class="title-likes">
                <span class="font-bold meal-title">${
  meal.strMeal.length > 14
    ? `${meal.strMeal.slice(0, 14)}...`
    : meal.strMeal
} </span>
                <span class="likes"></span>
              </div>
              <div class="comment-like">
                <button class="meal-btn" data-mealID="${
  meal.idMeal
}">Comments<svg class="meal-svg" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style=""><path d="M0 0L3 3L0 6"></path></svg>
                </button>
                <i class="fas fa-heart" id= ${meal.idMeal}></i>
      
      
              </div>
            </div>
            </div>
      
            `,
        )
        .join('');
      getMealsLength();
    }
  });
};
