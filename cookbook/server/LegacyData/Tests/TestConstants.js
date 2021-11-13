const user1 = {
    _id: 1,
    name: {first: "Ivan", last: "Skorodumov"},
    desc: "",
    image: "smth",
    likes: {
        recipes: [1, 2],
        cookBooks: [2, 3]
    },
    comments: [1, 3],
    cloudinary_id: "czhfi39eib0ppwpydgev"
}
const user1Full = {...user1, password: "1234", salt: "sail", email: "smth@gmail.com",}
const user1Private = {...user1, password: "1234", salt: "sail"}
const user1Public = user1

const user2 = {
    _id:2,
    name: {first: "Uncle", last: "Bob"},
    desc: "Programmer",
    image: "smth2",
    likes: {
        recipes: [],
        cookBooks: []
    },
    comments: [],
    cloudinary_id: "czhfi39eib0ppwpydgev"
}
const user2Full = {...user2, password: "1234", salt: "sail", email: "smth2@gmail.com",}
const user2Private = {...user2, password: "1234", salt: "sail"}
const user2Public = user2


const recipe1 = {
    _id:1,
    views: 1000,
    likes: 5,
    author: 1,
    image: "img",
    images: ["img", "img2", "img3"],
    cookTime: 40,
    creationDate: 0,
    desc: "12",
    name: "name",
    cloudinary_id: "d8xzn1mo92zory4j3ws7",
    secondary_cloudinary_ids: [["d8xzn1mo92zory4j3ws6"], ["d8xzn1mo92zory4j3ws8"]],
    commentsIds: [1],
    ingredients: ["a", "b"],
    directions: ["c", "d"],
}
const recipe2 = {
    views: 2000,
    author: 2,
    likes: 50,
    image: "imgs",
    images: ["img", "img2", "img3"],
    cookTime: 1000,
    creationDate: 0,
    desc: "21",
    name: "same",
    cloudinary_id: "s8xzn1mo92zory4j3ws7",
    secondary_cloudinary_ids: [["s8xzn1mo92zory4j3ws6"], ["s8xzn1mo92zory4j3ws8"]],
    commentsIds: [2],
    ingredients: ["a", "b"],
    directions: ["c", "d"],
}
const recipe3 = {
    views: 2000,
    author: 1,
    likes: 50,
    image: "imgs",
    images: ["img", "img2", "img3"],
    cookTime: 1000,
    creationDate: 0,
    desc: "21",
    name: "same",
    cloudinary_id: "s8xzn1mo92zory4j3ws7",
    secondary_cloudinary_ids: [["s8xzn1mo92zory4j3ws6"], ["s8xzn1mo92zory4j3ws8"]],
    commentsIds: [3,4],
    ingredients: ["a", "b"],
    directions: ["c", "d"],
}
const recipe4 = {
    views: 2000,
    author: 1,
    likes: 50,
    image: "im22gs",
    images: ["im2g", "img22", "img23"],
    cookTime: 1000,
    creationDate: 0,
    desc: "2221",
    name: "same",
    cloudinary_id: "s8xzn1mo92zory4j3ws7",
    secondary_cloudinary_ids: [["s8xzn31mo92zory4j3ws6"], ["s8xzn1mo923zory4j3ws8"]],
    commentsIds: [],
    ingredients: ["a", "b"],
    directions: ["c", "d"],
}


const cookbook1 = {
    _id:1,
    views: 2000,
    author: 1,
    likes: 50,
    recipesIds: [],
    image: "imgs",
    filters: ["vegeterian"],
    creationDate: 0,
    desc: "21",
    name: "same",
    commentsIds: [2],
}
const cookbook2 = {
    views: 2000,
    author: 1,
    likes: 50,
    recipesIds: [2],
    image: "imgsss",
    filters: [],
    creationDate: 0,
    desc: "21",
    name: "same",
    commentsIds: [],
}
const comment1 = {
    author: 1,
    text: "comment1",
    date: 2
}
const comment2 = {
    author: 2,
    text: "comment2",
    date: 3
}
const comment3 = {
    author: 1,
    text: "comment3",
    date: 2
}
const comment4 = {
    author: 2,
    text: "comment4",
    date: 3
}

const userClear ={
    _id: 1,
    name: {first: "Ivan", last: "Skorodumov"},
    desc: "",
    image: "smth",
    likes: {
        recipes: [],
        cookBooks: []
    },
    comments: [],
    cloudinary_id: "czhfi39eib0ppwpydgev"
}
exports.users = {
    user1Full, user1Public, user1Private, user2Full, user2Private, user2Public, userClear
}
exports.comments= {
    comment1, comment2, comment3, comment4
}
exports.recipes= {
    recipe1, recipe2, recipe3, recipe4
}
exports.cookbooks= {
    cookbook1, cookbook2,
}


