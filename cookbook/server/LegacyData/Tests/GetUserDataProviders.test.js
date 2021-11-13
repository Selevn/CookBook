const {getUserForLogin, getUserLikedRecipes, getUserRecipes, getUserLikedCookBooks, getUserCookBooks, getUser} = require("../Providers/GetUserDataProviders")
const {createUser, createCookBook, createRecipe} = require("../Providers/CreateProvider")
const db = require('./dbTestProvider')

const {users, cookbooks, recipes} = require("./TestConstants");
const {user1Full, user1Public, user2Full, user2Public} = users
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

describe("Get user", ()=>{
    it('Get null user', async () => {
        const result = (await getUser(null))[0]
        expect(result).toBeFalsy()
    })
    it('Get undefined user', async () => {
        const result = (await getUser())[0]
        expect(result).toBeFalsy()
    })
    it('Get 1 user', async () => {
        const result = (await getUser(1))[0]
        expect(result).toMatchObject(user1Public)
        expect(result).not.toMatchObject(user2Public)
    })
    it('Get 2 user', async () => {
        const result = (await getUser(2))[0]
        expect(result).toMatchObject(user2Public)
    })
    it('Get 30 user', async () => {
        const result = (await getUser(30))[0]
        expect(result).toBeFalsy()
    })
    it('Get full user', async () => {
        const result = (await getUserForLogin(user1Full.email))[0]
        expect(result).toMatchObject(user1Full)
    })

})

describe("Get user cookbooks", ()=>{
    let dispatcher
    beforeAll(()=>{
        dispatcher = getUserCookBooks;
    })
    it('Get no param', async () => {
        const result = (await dispatcher())
        expect(result).toBeFalsy()
    })
    it('Get null param', async () => {
        const result = (await dispatcher(null))
        expect(result).toBeFalsy()
    })
    it('Get null params', async () => {
        const result = (await dispatcher(null, null))
        expect(result).toBeFalsy()
    })
    it('Get id 1', async () => {
        const result = (await dispatcher(1))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2', async () => {
        const result = (await dispatcher(2))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2 page 2', async () => {
        const result = (await dispatcher(1, {page:2}))
        expect(result).toHaveProperty("docs")
    })
    it('Get inf user', async () => {
        const result = (await dispatcher(1000))
        expect(result).toHaveProperty("docs")
    })
})

describe("Get user recipes", ()=>{
    let dispatcher
    beforeAll(()=>{
        dispatcher = getUserRecipes;
    })
    it('Get no param', async () => {
        const result = (await dispatcher())
        expect(result).toBeFalsy()
    })
    it('Get null param', async () => {
        const result = (await dispatcher(null))
        expect(result).toBeFalsy()
    })
    it('Get null params', async () => {
        const result = (await dispatcher(null, null))
        expect(result).toBeFalsy()
    })
    it('Get id 1', async () => {
        const result = (await dispatcher(1))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2', async () => {
        const result = (await dispatcher(2))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2 page 2', async () => {
        const result = (await dispatcher(1, {page:2}))
        expect(result).toHaveProperty("docs")
    })
    it('Get inf user', async () => {
        const result = (await dispatcher(1000))
        expect(result).toHaveProperty("docs")
    })
})
describe("Get user recipes liked", ()=>{
    let dispatcher
    beforeAll(()=>{
        dispatcher = getUserLikedRecipes;
    })
    it('Get no param', async () => {
        const result = (await dispatcher())
        expect(result).toBeFalsy()
    })
    it('Get null param', async () => {
        const result = (await dispatcher(null))
        expect(result).toBeFalsy()
    })
    it('Get null params', async () => {
        const result = (await dispatcher(null, null))
        expect(result).toBeFalsy()
    })
    it('Get id 1', async () => {
        const result = (await dispatcher(1))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2', async () => {
        const result = (await dispatcher(2))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2 page 2', async () => {
        const result = (await dispatcher(1, {page:2}))
        expect(result).toHaveProperty("docs")
    })
    it('Get inf user', async () => {
        const result = (await dispatcher(1000))
        expect(result).toHaveProperty("docs")
    })
})

describe("Get user cookbooks liked", ()=>{
    let dispatcher
    beforeAll(()=>{
        dispatcher = getUserLikedCookBooks;
    })
    it('Get no param', async () => {
        const result = (await dispatcher())
        expect(result).toBeFalsy()
    })
    it('Get null param', async () => {
        const result = (await dispatcher(null))
        expect(result).toBeFalsy()
    })
    it('Get null params', async () => {
        const result = (await dispatcher(null, null))
        expect(result).toBeFalsy()
    })
    it('Get id 1', async () => {
        const result = (await dispatcher(1))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2', async () => {
        const result = (await dispatcher(2))
        expect(result).toHaveProperty("docs")
    })
    it('Get id 2 page 2', async () => {
        const result = (await dispatcher(1, {page:2}))
        expect(result).toHaveProperty("docs")
    })
    it('Get inf user', async () => {
        const result = (await dispatcher(1000))
        expect(result).toHaveProperty("docs")
    })
})

