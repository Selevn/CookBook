const {createUser, createCookBook, createRecipe, addComment} = require("../Providers/CreateProvider")
const {getUser} = require("../Providers/GetUserDataProviders")
const {getCookBook} = require("../Providers/GetProviders")

const db = require('./dbTestProvider')
const {COMMENT_FIELDS} = require("../ConstantsProvider");
const {USER_FIELDS} = require("../ConstantsProvider");
const {users, cookbooks, recipes, comments} = require("./TestConstants");
const {user1Full, user1Public, user2Full, user2Public, userClear} = users
const {cookbook1, cookbook2} = cookbooks
const {recipe1, recipe2} = recipes
const {comment1, comment2} = comments

const {COMMON} = require("../ConstantsProvider");
beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Create user', () => {
    it('Null user create', async () => {
        const result = await createUser(null)
        expect(result).toBeFalsy()
    })
    it('No arg user create', async () => {
        const result = await createUser()
        expect(result).toBeFalsy()
    })
    it('Normal user create', async () => {
        const result = await createUser({email: "van000200136@gmail.com", password:"12345678", salt: "sail"})
        expect(result).toEqual(expect.any(Number))
    })
    it('Two users create', async () => {
        const result = await createUser({email: "van000200136@gmail.com", password:"12345678", salt: "sail"})
        expect(result).toEqual(expect.any(Number))
        const result2 = await createUser({email: "ivan000200136@gmail.com", password:"12345678", salt: "sail"})
        expect(result2).toEqual(expect.any(Number))

    })

})
describe('Create recipe', () => {
    it('Null recipe create', async () => {
        const result = await createRecipe(null)
        expect(result).toBeFalsy()
    })
    it('No arg recipe create', async () => {
        const result = await createRecipe()
        expect(result).toBeFalsy()
    })
    it('Normal recipe create', async () => {
        const result = await createRecipe({name:"name", desc:"", image:"http://img.com"})
        expect(result).toEqual(expect.any(Number))
    })
    it('Full data recipe create', async () => {
        const result = await createRecipe(recipe1)
        const result2 = await createRecipe(recipe2)
        expect(result).toEqual(expect.any(Number))
        expect(result2).toEqual(expect.any(Number))
    })

    it('Non spread recipe create', async () => {
        const result = await createRecipe(142)
        expect(result).toEqual(expect.any(Number))
    })
})
describe('Create cookbook', () => {
    it('Null cookbook create', async () => {
        const result = await createCookBook(null)
        expect(result).toBeFalsy()
    })
    it('No arg cookbook create', async () => {
        const result = await createCookBook()
        expect(result).toBeFalsy()
    })
    it('Normal cookbook create', async () => {
        const result = await createCookBook({name:"name", desc:"", image:"http://img.com"})
        expect(result).toEqual(expect.any(Number))
    })
    it('Normal two cookbooks create', async () => {
        const result = await createCookBook({name:"name", desc:"", image:"http://img.com"})
        expect(result).toEqual(expect.any(Number))
        const result2 = await createCookBook({name:"namew", desc:"w", image:"http://2img.com"})
        expect(result2).toEqual(expect.any(Number))
    })

})
describe('Create comment', () => {

    beforeEach(async () => {
        await createUser(userClear)
        await createUser(user2Full)
        await createCookBook(cookbook1)
        await createCookBook(cookbook2)
        await createRecipe(recipe1)
        await createRecipe(recipe2)
    })

    it('Null comment create', async () => {
        const result = await addComment(null)
        expect(result).toBeFalsy()
    })
    it('No arg comment create', async () => {
        const result = await addComment()
        expect(result).toBeFalsy()
    })
    it('Normal cookbook comment create', async () => {
        const itemId = 1
        const result = await addComment({[COMMENT_FIELDS.author]:1, [COMMENT_FIELDS.itemType]:COMMON.COOKBOOK, [COMMENT_FIELDS.itemId]:itemId, [COMMENT_FIELDS.text]:"Good"})
        expect(result).toEqual(true)

        const user = (await getUser(1))[0]
        const cookBook = (await getCookBook(itemId))[0]

        expect(user[USER_FIELDS.comments]).toContain(itemId)
        expect(cookBook.commentsIds).toContain(1)
    })

})