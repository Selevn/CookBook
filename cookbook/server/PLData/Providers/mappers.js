exports.cookBookMapper = (cookBook) => {
  const new_book = {}
  new_book._id = cookBook._id
  new_book.views = cookBook.views
  new_book.image = cookBook.image
  new_book.filters = cookBook.filters
  new_book.creationDate = cookBook.creation_date
  new_book.author = [{
    image:cookBook.personimage,
    name: {
      first:cookBook.first_name,
      last:cookBook.last_name
    }
  }]
  new_book.name = cookBook.name
  new_book.desc = cookBook.desc
  new_book.likes = cookBook.likes
  return new_book;
}

exports.recipeMapper = (recipe) => {
  const new_recipe = {}
  new_recipe._id = recipe._id
  new_recipe.views = recipe.views
  new_recipe.image = recipe.image
  new_recipe.cookTime = recipe.cook_time
  new_recipe.creationDate = recipe.creation_date
  new_recipe.author = [{
    image:recipe.personimage,
    name: {
      first:recipe.first_name,
      last:recipe.last_name
    }
  }]
  new_recipe.name = recipe.name
  new_recipe.desc = recipe.desc
  if(typeof recipe.ingredients === 'string')
    new_recipe.ingredients = JSON.parse(recipe.ingredients)
  else
    new_recipe.ingredients = recipe.ingredients

  if(typeof recipe.directions === 'string')
    new_recipe.directions = JSON.parse(recipe.directions)
  else
    new_recipe.directions = recipe.directions
  new_recipe.likes = recipe.likes
  return new_recipe;
}


