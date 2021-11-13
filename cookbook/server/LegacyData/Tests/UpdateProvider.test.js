const db = require('./dbTestProvider')
const {USER_FIELDS} = require("../ConstantsProvider");
const {users, cookbooks, recipes} = require("./TestConstants");
const {user1Full, user2Full} = users
const {cookbook1, cookbook2} = cookbooks
const {recipe1, recipe2} = recipes
const {updateRecipe, updateCookBook, updateUser} = require("../Providers/UpdateProvider")
const {getRecipe, getCookBook}= require("../Providers/GetProviders")
const {getUser}= require("../Providers/GetUserDataProviders")
const {createUser, createCookBook, createRecipe} = require("../Providers/CreateProvider")

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



describe('Update recipe tests', () => {
    it("No args",async ()=>{
        const result = await updateRecipe()
        expect(result).toBeFalsy()
    })
    it("Null arg",async ()=>{
        const result = await updateRecipe(null)
        expect(result).toBeFalsy()
    })
    it("Normal arg",async ()=>{
        const newRecipe = recipe1
        newRecipe.name = "__testName__"
        const result = await updateRecipe(newRecipe)
        expect(result).toBeTruthy()
        const result2 = (await getRecipe(recipe1._id))[0]
        expect(result2.name).toEqual(newRecipe.name)
    })
    it("Update inf",async ()=>{
        const newRecipe = recipe1
        newRecipe.name = "__testName__"
        newRecipe._id = 1000
        const result = await updateRecipe(newRecipe)
        expect(result).toBeFalsy()
    })
    it("Only _id",async ()=>{
        const newRecipe = {_id:1}
        const result = await updateRecipe(newRecipe)
        expect(result).toBeFalsy()
    })
    it("Not only _id",async ()=>{
        const newRecipe = {_id:1, name:"a"}
        const result = await updateRecipe(newRecipe)
        expect(result).toBeTruthy()
    })
})

describe('Update cookbook tests', () => {
    it("No args",async ()=>{
        const result = await updateCookBook()
        expect(result).toBeFalsy()
    })
    it("Null arg",async ()=>{
        const result = await updateCookBook(null)
        expect(result).toBeFalsy()
    })
    it("Normal arg",async ()=>{
        const newCookbook = cookbook1
        newCookbook.name = "__testName__"
        const result = await updateCookBook(newCookbook)
        expect(result).toBeTruthy()
        const result2 = (await getCookBook(cookbook1._id))[0]
        expect(result2.name).toEqual(newCookbook.name)
    })
    it("Update inf",async ()=>{
        const newCookbook = recipe1
        newCookbook.name = "__testName__"
        newCookbook._id = 1000
        const result = await updateCookBook(newCookbook)
        expect(result).toBeFalsy()
    })
    it("Only _id",async ()=>{
        const newCookbook = {_id:1}
        const result = await updateCookBook(newCookbook)
        expect(result).toBeFalsy()
    })
    it("Not only _id",async ()=>{
        const newCookbook = {_id:1, name:"a"}
        const result = await updateCookBook(newCookbook)
        expect(result).toBeTruthy()
    })
})

describe('Update user tests', () => {
    it("No args",async ()=>{
        const result = await updateUser()
        expect(result).toBeFalsy()
    })
    it("Null arg",async ()=>{
        const result = await updateUser(null)
        expect(result).toBeFalsy()
    })
    it("Null args",async ()=>{
        const result = await updateUser(null, null)
        expect(result).toBeFalsy()
    })
    it("Null args",async ()=>{
        const result = await updateUser(null, null, null)
        expect(result).toBeFalsy()
    })
    it("Update inf",async ()=>{
        const result = await updateUser(1000, USER_FIELDS.desc, "__new_name__")
        expect(result).toBeFalsy()
    })
    it("Update unknownField",async ()=>{
        const result = await updateUser(1, "unknown_field", "__new_name__")
        expect(result).toBeFalsy()
    })
    it("Normal update",async ()=>{
        const newValue = "__new_desc__";
        const result = await updateUser(1, USER_FIELDS.desc, newValue)
        expect(result).toBeTruthy()
        const result2 = (await getUser(1))[0]
        expect(result2.desc).toEqual(newValue)
    })
    it("Normal deep update",async ()=>{
        const newValue = "__new_desc__";
        const result = await updateUser(1, USER_FIELDS.firstName, newValue)
        expect(result).toBeTruthy()
        const result2 = (await getUser(1))[0]
        expect(result2.name.first).toEqual(newValue)
    })
    it("Only _id",async ()=>{
        const result = await updateUser(1)
        expect(result).toBeFalsy()
    })
})