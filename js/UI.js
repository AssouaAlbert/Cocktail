class UI {

    displayCategories(selectCategory){

        const categoryList = cockTail.getCategories();
        categoryList.then((categories)=>{
            const firstOption = document.createElement('option');
            firstOption.value = '';
            firstOption.textContent = '--Select--';
            selectCategory.appendChild(firstOption);
            categories.drinks.forEach((category)=>{
                // console.log('category: ', category);
                const option = document.createElement('option');
                option.value = category.strCategory.replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_").replace(" ","_");
                // option.value = category.strCategory.split(' ').join('_');
                option.textContent = category.strCategory;
                selectCategory.appendChild(option);
            });
        });
    }
    displayDrinksWithIngredients(drinks){
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display ='block';
        console.log("drinks:",drinks);
        //reesults Div
        let resultsDiv = document.getElementById('results');
        drinks.forEach(drink => {
            resultsDiv.innerHTML +=`
            <div class="col-md-6">
            <div class="card my-3">
                 <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                 +
                 </button>
                 <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
    
                 <div class="card-body">
                      <h2 class="card-title text-center">${drink.strDrink}</h2>
                      <p class="card-text font-weight-bold">Instructions: </p>
                      <p class="card-text">
                            ${drink.strInstructions}
                      </p>
                      <p class="card-text">
                           <ul class="list-group">
                                <li class="list-group-item alert alert-danger">Ingredients</li>
                                ${this.displayIngredients(drink)}
                           </ul>
                      </p>
                      <p class="card-text font-weight-bold">Extra Information:</p>
                      <p class="card-text">
                           <span class="badge badge-pill badge-success">
                                ${drink.strAlcoholic}
                           </span>
                           <span class="badge badge-pill badge-warning">
                                Category: ${drink.strCategory}
                           </span>
                      </p>
                 </div>
            </div>
       </div>
            `    
        });
    }

    displayIngredients(drink){
        // console.log(drink);

        let ingredients = [];
        for(let i = 1; i < 16; i++) {
            const ingredientMeasure = {};
            if( (drink[`strMeasure${i}`] !== '') && (drink[`strMeasure${i}`] !== null)) {
                    ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                    ingredientMeasure.measure = drink[`strMeasure${i}`];
                    ingredients.push(ingredientMeasure);
            }
        }
        let ingredientsTemplate = '';
        ingredients.forEach(ingredient => {
             ingredientsTemplate += `
                  <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
             `;
        });

        return ingredientsTemplate;
    }
    printMessage(message, className){
        const div = document.createElement('div');
        div.innerHTML=`
        <div class='alert alert-dismissible alert-${className}'>
            <button type='button' class='close' data-dismiss='alert'>X</button>
            ${message}
        </div>
        `
        document.querySelector('.jumbotron h1').parentElement.insertBefore(div,document.querySelector('.jumbotron h1'));         //Syntax node.insertBefore(elementToInsert,beforeWhichChildElement)
        //Remove the Printed message after 3 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
        
    }
    displayDrinks(drinks){
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display ='block';
        console.log("drinks:",drinks);
        //reesults Div
        let resultsDiv = document.getElementById('results');
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
            <div class="col-md-4">
            <div class="card my-3">
                 <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                 +
                 </button>
                 <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
    
                 <div class="card-body">
                      <h2 class="card-title text-center">${drink.strDrink}</h2>
                      <a class='btn btn-success get-recipe' data-target='#recipe'  href='#' data-toggle='modal' data-id='${drink.idDrink}'>Get Recipe</a>
                 </div>
            </div>
       </div>
            `
        });
    }
    //Clear prvious results onload
    clearPreviousResults(){
        const resultsDiv = document.querySelector('#results');
        while(resultsDiv.firstChild)
        {resultsDiv.firstChild.remove();}
    }
    displaySingleRecipe(drink){
          // Get variables
          const modalTitle = document.querySelector('.modal-title'),
                modalDescription = document.querySelector('.modal-body .description-text'),
                modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');
        modalTitle.innerHTML = drink.strDrink;
        modalDescription.innerHTML= drink.strInstructions;
        modalIngredients.innerHTML = this.displayIngredients(drink);

    }
    loadFavorites(favoriteTable){
        const ls = cocktailDB.getFromDB();
        const tableContent = favoriteTable.querySelector('tbody');
        ls.forEach((item)=>{
            const table = document.createElement('tr');
            table.innerHTML += `
                <td><img src='${item.image}' alt='${item.title}'width='100' height='100'></td>
                <td>${item.title}</td>
                <td><a class='btn btn-success get-recipe' data-target='#recipe'  href='#' data-toggle='modal' data-id='${item.id}'>Get Recipe</a></td>
                <td><button type="button" data-id="${item.id}" class="favorite-btn btn btn-outline-info danger">Delete</td>
                 `
            tableContent.appendChild(table);
        });
    }

}