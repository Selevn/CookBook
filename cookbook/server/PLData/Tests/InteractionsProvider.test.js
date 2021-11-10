const {visitItem, likeRecipe, likeCookBook} = require("../Providers/InteractionsProvider")
const db = require('./dbTestProvider')
const {COMMON} = require("../ConstantsProvider");
const {getUser} = require("../Providers/GetUserDataProviders");
const {users, cookbooks, recipes} = require("./TestConstants");
const {user1Full, user2Full} = users
const {cookbook1, cookbook2} = cookbooks
const {recipe1, recipe2} = recipes
const {createUser, createCookBook, createRecipe} = require("../Providers/CreateProvider")
const {getCookBook, getRecipe} = require("../Providers/GetProviders")

beforeEach(async () => {
    await createUser(user1Full)
    await createUser(user2Full)
    await createCookBook(cookbook1)
    await createCookBook(cookbook2)
    await createRecipe(recipe1)
    await createRecipe(recipe2)
})

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())



describe('Likes recipes tests', () => {
    it("No args",async ()=>{
        const result = await likeRecipe()
        expect(result).toBeFalsy()
    })
    it("Null arg",async ()=>{
        const result = await likeRecipe(null)
        expect(result).toBeFalsy()
    })
    it("Null args",async ()=>{
        const result = await likeRecipe(null, null)
        expect(result).toBeFalsy()
    })
    it("Inf User arg",async ()=>{
        const result = await likeRecipe(1000, 1)
        expect(result).toBeFalsy()
    })
    it("Inf item arg",async ()=>{
        const result = await likeRecipe(1, 1000)
        expect(result).toBeFalsy()
    })
    it("Normal dislike",async ()=>{
        let user, likeCount;
        const userId = 1
        const itemId = 1
        user = (await getUser(userId))[0]
        expect(user.likes.recipes).toContain(itemId)

        likeCount = (await getRecipe(itemId))[0].likes
        const result = await likeRecipe(userId, itemId)
        expect(result).toBeTruthy()
        user = (await getUser(userId))[0]
        expect(user.likes.recipes).not.toContain(itemId)

        expect((await getRecipe(itemId))[0].likes).toBe(likeCount-1)
    })
    it("Normal like",async ()=>{
        let user, likeCount;
        const userId = 2
        const itemId = 1
        likeCount = (await getRecipe(itemId))[0].likes
        user = (await getUser(userId))[0]
        expect(user.likes.recipes).not.toContain(itemId)
        const result = await likeRecipe(userId, itemId)
        expect(result).toBeTruthy()
        user = (await getUser(userId))[0]
        expect(user.likes.recipes).toContain(itemId)
        expect((await getRecipe(itemId))[0].likes).toBe(likeCount+1)
    })
})

describe('Likes cookbooks tests', () => {
    it("No args",async ()=>{
        const result = await likeCookBook()
        expect(result).toBeFalsy()
    })
    it("Null arg",async ()=>{
        const result = await likeCookBook(null)
        expect(result).toBeFalsy()
    })
    it("Null args",async ()=>{
        const result = await likeCookBook(null, null)
        expect(result).toBeFalsy()
    })
    it("Inf User arg",async ()=>{
        const result = await likeCookBook(1000, 1)
        expect(result).toBeFalsy()
    })
    it("Inf item arg",async ()=>{
        const result = await likeCookBook(1, 1000)
        expect(result).toBeFalsy()
    })
    it("Normal dislike",async ()=>{
        let user, likeCount;
        const userId = 1
        const itemId = 2
        likeCount = (await getCookBook(itemId))[0].likes
        user = (await getUser(userId))[0]
        expect(user.likes.cookBooks).toContain(itemId)
        const result = await likeCookBook(userId, itemId)
        expect(result).toBeTruthy()
        user = (await getUser(userId))[0]
        expect(user.likes.cookBooks).not.toContain(itemId)
        expect((await getCookBook(itemId))[0].likes).toBe(likeCount-1)
    })
    it("Normal like",async ()=>{
        let user, likeCount;
        const itemId = 1
        const userId = 2
        likeCount = (await getCookBook(itemId))[0].likes

        user = (await getUser(userId))[0]
        expect(user.likes.cookBooks).not.toContain(itemId)
        const result = await likeCookBook(userId, itemId)
        expect(result).toBeTruthy()
        user = (await getUser(userId))[0]
        expect(user.likes.cookBooks).toContain(itemId)
        expect((await getCookBook(itemId))[0].likes).toBe(likeCount+1)
    })
})

describe('Visit item tests', () => {
    it("No args visit",async ()=>{
        const result = await visitItem()
        expect(result).toBeFalsy()
    })
    it("Null visit",async ()=>{
        const result = await visitItem(null)
        expect(result).toBeFalsy()
    })
    it("Null args visit",async ()=>{
        const result = await visitItem(null, null)
        expect(result).toBeFalsy()
    })

    it("Inf visit",async ()=>{
        const result = await visitItem(1000)
        expect(result).toBeFalsy()
    })
    it("No type visit",async ()=>{
        const itemId = 1;

        const result = await visitItem(itemId)
        expect(result).toBeFalsy()
    })
    it("Normal cookbook visit",async ()=>{
        const itemId = 1;
        const oldVisited = (await getCookBook(itemId))[0].views
        const result = await visitItem(itemId, COMMON.COOKBOOK)
        expect(result).toBeTruthy()
        expect((await getCookBook(itemId))[0].views).toBe(oldVisited+1)
    })
    it("Normal recipe visit",async ()=>{
        const itemId = 1;
        const oldVisited = (await getRecipe(itemId))[0].views
        const result = await visitItem(itemId, COMMON.RECIPE)
        expect(result).toBeTruthy()
        expect((await getRecipe(itemId))[0].views).toBe(oldVisited+1)

    })

})