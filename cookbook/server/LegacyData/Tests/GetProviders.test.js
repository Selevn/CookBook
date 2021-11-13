const {getCookBooks, getCookBook, getRecipes, getRecipe, getComments} = require("../Providers/GetProviders")
const {createUser, createCookBook, createRecipe, addComment} = require("../Providers/CreateProvider")
const db = require('./dbTestProvider')
const {COMMON} = require("../ConstantsProvider");
const {recipes} = require("./TestConstants");
const {users, cookbooks, comments} = require("./TestConstants");

const {user1Full, user1Private, user1Public, user2Full, user2Private, user2Public, userClear} = users
const {cookbook1, cookbook2} = cookbooks
const {recipe1, recipe2} = recipes
const {comment2, comment1} = comments

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
beforeEach(async () => {
    await createUser(userClear)
    await createUser(user2Full)
    await createCookBook(cookbook1)
    await createCookBook(cookbook2)
    await createRecipe(recipe1)
    await createRecipe(recipe2)
    await addComment(comment1)
    await addComment(comment2)
})
afterAll(async () => await db.closeDatabase())

describe('Get Cookbooks test', () => {

    it('Get no filters', async () => {
        const result = await getCookBooks()
        expect(result.docs).toHaveLength(2)
    })
    it('Get null filters', async () => {
        const result = await getCookBooks(null)
        expect(result.docs).toHaveLength(2)
    })

    it('Get page 2', async () => {
        const result = await getCookBooks({page:2})
        expect(result.docs).toHaveLength(0)
    })
    it('Get vegan', async () => {
        const result = await getCookBooks({vegeterian:'true'})
        expect(result.docs).toHaveLength(1)
    })

    it('Get cookbook 1', async () => {
        const result = (await getCookBook(1))[0]
        expect(result).toHaveProperty("author.0.image","author.0.first", "author.0.last", "name", "desc")
    })
    it('Get cookbook 2', async () => {
        const result = (await getCookBook(2))[0]
        expect(result).toHaveProperty("author.0.image","author.0.name", "author.0.name.last", "name", "desc")
        expect(result.author[0].name.first).toBe("Ivan")
    })
    it('Get cookbook inf', async () => {
        const result = (await getCookBook(200))[0]
        expect(result).toBeFalsy()
    })

    it('Get cookbook null', async () => {
        const result = (await getCookBook(null))[0]
        expect(result).toBeFalsy()
    })

})
describe('Get Recipes test', ()=>{
    it('Get no recipes', async () => {
        const result = await getRecipes()
        expect(result.docs).toHaveLength(2)
    })
    it('Get null recipes', async () => {
        const result = await getRecipes(null)
        expect(result.docs).toHaveLength(2)
    })
    it('Get 20 min recipes', async () => {
        const result = await getRecipes({cookTime:20})
        expect(result.docs).toHaveLength(0)
    })
    it('Get 1000 min recipes', async () => {
        const result = await getRecipes({cookTime:1000})
        expect(result.docs).toHaveLength(1)
    })
    it('Get 40 min recipes', async () => {
        const result = await getRecipes({cookTime:40})
        expect(result.docs).toHaveLength(1)
    })

    it('Get 1 recipe', async () => {
        const result = (await getRecipe(1))[0]
        expect(result).toBeTruthy()
        expect(result).toHaveProperty("_id", 1)
        expect(result).toHaveProperty("name")
        expect(result).toHaveProperty("author")
    })
    it('Get 2 recipe', async () => {
        const result = (await getRecipe(2))[0]
        expect(result).toBeTruthy()
        expect(result).toHaveProperty("_id", 2)
        expect(result).toHaveProperty("name")
        expect(result).toHaveProperty("author")
    })
    it('Get null recipe', async () => {
        const result = (await getRecipe(null))[0]
        expect(result).toBeFalsy()
    })

})
describe('Get Comments test', ()=>{
    it('Get no comments', async () => {
        const result = await getComments()
        expect(result.docs).toBeFalsy()
    })
    it('Get null comments', async () => {
        const result = await getComments(null)
        expect(result.docs).toBeFalsy()
    })
    it('Get cookbook 1 comments', async () => {
        const result = await getComments({type:COMMON.COOKBOOK, itemId:1})
        expect(result.docs).toHaveLength(1)
    })
    it('Get cookbook 2 comments', async () => {
        const result = await getComments({type:COMMON.COOKBOOK, itemId:2})
        expect(result.docs).toHaveLength(0)
    })
    it('Get cookbook inf comments', async () => {
        const result = await getComments({type:COMMON.COOKBOOK, itemId:1000})
        expect(result.docs).toBeFalsy()
    })

    it('Get recipe 1 comments', async () => {
        const result = await getComments({type:COMMON.RECIPE, itemId:1})
        expect(result.docs).toHaveLength(1)
    })
    it('Get recipe 2 comments', async () => {
        const result = await getComments({type:COMMON.RECIPE, itemId:2})
        expect(result.docs).toHaveLength(1)
    })
    it('Get recipe inf comments', async () => {
        const result = await getComments({type:COMMON.RECIPE, itemId:1000})
        expect(result.docs).toBeFalsy()
    })

    it('Get unknown type comments', async () => {
        const result = await getComments({type:"unknown type", itemId:1})
        expect(result.docs).toBeFalsy()
    })
})

