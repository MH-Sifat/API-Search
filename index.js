document.getElementById('error-massage').style.display = 'none';
document.getElementById('error-item').style.display = 'none';

function  searchFood(){
    const searchField = document.getElementById('search-Field');
    const searchText = searchField.value;
    searchField.value =''; // clear the input
    document.getElementById('error-massage').style.display = 'none';

    // can not be empty condition
     if(searchText == ""){
     document.getElementById('error-massage').style.display = 'block';

     }
     else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
     }

   


}

const displaySearchResult = (meals) =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = ''; // for clear 
    document.getElementById('error-item').style.display = 'none';

    if(meals == null || meals.length < 1){
    document.getElementById('error-item').style.display = 'block';

    }
    else{
        meals.forEach(meal =>{
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col') 
            div.innerHTML=`
            <div onclick="loadMealDetail(${meal.idMeal})" class="card" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
                  <a href="${meal.strYoutube}" target="_blank" class="btn btn-outline-primary">Youtube</a>
                  </div>
              </div>
             
            `
     searchResult.appendChild(div)
        })

    }
    
}

const loadMealDetail = (mealId) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => displayDetails(data.meals[0]))

}

const displayDetails = (meal) =>{
    const mealDetail = document.getElementById('meal-details');
    mealDetail.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card') 
    div.innerHTML=`
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions}</p>
          <a href="${meal.strYoutube}" target="_blank"
           class="btn btn-outline-primary">Youtube</a>
        </div>
     
    `
    mealDetail.appendChild(div)

}

// function categories(){
//     fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
//     .then(res => res.json())
//     .then(data => console.log(data.categories))
// }


