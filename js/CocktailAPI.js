class CocktailAPI {
     // Get recipe by name
     async getDrinksByName(name) {
        // Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        // Returns a json respone
        const cocktails = await apiResponse.json();

        return cocktails;
   }
   async getDrinksByIngredient(ingredient) {
          // Search by ingredient
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
          // Returns a json respone
          const cocktails = await apiResponse.json();
          return cocktails;
     }
     async getSingleRecipe(id){
          // Get a single recipe of a drink
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const cocktails = await apiResponse.json();
          return cocktails;
     }
     //Rerieves all the categories from the REST API
     async getCategories(){
          const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
          // Wait for response and return JSON
          const categories = await apiResponse.json();
          return categories;
     }
     async getDrinksByCategory(category){
          // Search by Category
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
          // Wait for response then return JSON
          const cocktails = await apiResponse.json();
          return cocktails
     }
     async getDrinksByAlcohol(alcohol){
          const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`);
          // Wait for response then return JSON
          const cocktails = await apiResponse.json();
          return cocktails 
     }
}