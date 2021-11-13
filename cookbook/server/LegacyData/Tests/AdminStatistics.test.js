const {getUserForLogin, getUserLikedRecipes, getUserRecipes, getUserLikedCookBooks, getUserCookBooks, getUser} = require("../Providers/GetUserDataProviders")
const {createUser, createCookBook, createRecipe} = require("../Providers/CreateProvider")
const db = require('./dbTestProvider')
const {getUsersStatistics} = require("../DataProvider");

const {users, cookbooks, recipes} = require("./TestConstants");
const {user1Full, user2Full } = users
const {cookbook1, cookbook2} = cookbooks
const {recipe1, recipe2} = recipes
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

describe("Get users statistics", ()=> {
    it('User count correct', async () => {
        const result = await getUsersStatistics()
        expect(result).toBeTruthy()
        expect(result).toHaveProperty("docs.0.userRecipes", expect.any(Array))
    })
})