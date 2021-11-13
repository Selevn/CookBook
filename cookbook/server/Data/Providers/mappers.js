exports.cookBookMapper = (cookBook) => {
  const new_book = {}
  new_book._id = cookBook._id
  new_book.views = Number(cookBook.views)
  new_book.image = cookBook.image
  new_book.filters = cookBook.filters
  new_book.creationDate = cookBook.creation_date
  new_book.author = [{
    _id:cookBook.author_id || cookBook.author,
    image:cookBook.personimage,
    name: {
      first:cookBook.first_name,
      last:cookBook.last_name
    }
  }]
  new_book.name = cookBook.name
  new_book.desc = cookBook.desc
  new_book.likes = Number(cookBook.likes)
  new_book.comments = {length:Number(cookBook.comments)};
  new_book.commentsIds = {length:Number(cookBook.comments)};

  return new_book;
}

exports.commentMapper = (comment) => {
  const newComment = {...comment}
  newComment.author = [{
    _id:comment.author_id,
    name: {
      first:  comment.first_name,
      last:  comment.last_name,
    },
    image: comment.image
  }]
  return newComment;
}

exports.recipeMapper = (recipe) => {
  const new_recipe = {}
  new_recipe._id = recipe._id
  new_recipe.views = Number(recipe.views)
  new_recipe.image = recipe.image
  new_recipe.cookTime = recipe.cook_time
  new_recipe.creationDate = recipe.creation_date
  new_recipe.author = [{
    _id:recipe.author_id || recipe.author,
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
  new_recipe.likes = Number(recipe.likes)
  new_recipe.comments = {length:Number(recipe.comments)};
  new_recipe.commentsIds = {length:Number(recipe.comments)};

  return new_recipe;
}


exports.userMapper = (user) => {
  const new_user = {...user}
  new_user.cloudinary_id = null;
  if(user.image.indexOf('res.cloudinary.com') !== -1){
    new_user.cloudinary_id = user.image.slice(user.image.lastIndexOf('/')+1,user.image.lastIndexOf('.'))
  }
  new_user.image = user.image;

  new_user.name = {
    first:user.first_name,
    last:user.last_name
  }

  return new_user;
}
