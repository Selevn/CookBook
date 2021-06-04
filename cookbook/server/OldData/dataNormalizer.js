const cookBookfixer = (item)=>{
    return item && {
        ...item
    }
}
const recipeFixer = (item)=>{
    return item && {
        ...item
    }
}


exports.normalizeCookbooks = (data)=>{
    if(!data)
        return false
    if(Array.isArray(data))
        return data.map(cookBookfixer);
    else
        return cookBookfixer(data);
}
exports.normalizeRecipes = (data)=>{
    if(!data)
        return false
    if(Array.isArray(data))
        return data.map(recipeFixer);
    else
        return recipeFixer(data);
}

