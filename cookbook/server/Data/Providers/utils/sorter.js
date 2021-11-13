exports.sorter = (sortby)=>{
  if(!sortby)
    return 0
  if(sortby.toUpperCase() === 'mostPopular'.toUpperCase())
    return 1
  if(sortby.toUpperCase() === 'mostLiked'.toUpperCase())
    return 3
  if(sortby.toUpperCase() === 'newest'.toUpperCase())
    return 2
  if(sortby.toUpperCase() === 'ourchoise'.toUpperCase())
    return 3
}
