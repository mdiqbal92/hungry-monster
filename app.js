// variable declaring and catching elements
const searchBtn = document.getElementById('searchBtn');
const warning = document.getElementById('warning');
const mealContainer = document.getElementById('meals');

// Button handler
searchBtn.addEventListener('click', function () {
    const inputMeal = document.getElementById('inputMeal').value;
    mealContainer.innerHTML = '';
    if (inputMeal === '') {
        warning.style.display = 'block';
    } else {
        getMeal(inputMeal);
        warning.style.display = 'none';
    }
});
// multiple api calling to show meal 
const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderMealInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};
// Showing meal ingredients
const renderMealInfo = meal => {
    const mealDetailsDiv = document.getElementById('mealsDetails');

    mealDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${meal.strMealThumb}" alt="">
    <h4>${meal.strMeal}</h4>
    
    <h5>Ingredients</h5>
    <ul">
        <li>${meal.strMeasure1}, ${meal.strIngredient1}</li>
        <li>${meal.strMeasure2}, ${meal.strIngredient2}</li>
        <li>${meal.strMeasure3}, ${meal.strIngredient3}</li>
        <li>${meal.strMeasure4}, ${meal.strIngredient4}</li>
        <li>${meal.strMeasure5}, ${meal.strIngredient5}</li>
    </ul>

`;
};

// main api calling and show search result
function getMeal(mealId) {
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayMeals(data.meals);
        });

    const displayMeals = meals => {
        const foodsDiv = document.getElementById('meals');
        if (meals != null) {
            meals.map(meal => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const mealDetails = `
                        <div onclick="displayDetails('${meal.idMeal}')" class="border rounded text-center" data-bs-toggle="modal" data-bs-target="#showModal">
                        <img class="img-fluid rounded-top" src="${meal.strMealThumb}" alt="">
                        <h3 class="h5 mt-2">${meal.strMeal}</h3>
                        </div>
                    `;
                foodDiv.innerHTML = mealDetails;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            warning.style.display = 'block';
        }
    };
}
