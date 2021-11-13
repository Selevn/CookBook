const countProvider = require('../Providers/CountProviders');
const {createUser} = require("../Providers/CreateProvider")
const db = require('./dbTestProvider')
beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Count tests', () => {

    it('User count correct', async () => {
        const result = await countProvider.getUsersCount()
        expect(result).toBe(0)
    })
    it('User count after add some', async ()=>{
        const count = Math.floor(Math.random() * (10 - 1));
        for (let i = 0; i < count; i++) {
            await createUser({email: "van000200136@gmail.com", password:"12345678", salt: "sail"})
        }
        expect(await countProvider.getUsersCount()).toBe(count)
    })

    it('Cookbooks count correct', async () => {
        const result = await countProvider.getCookbooksCount()
        expect(result).toBe(0)
    })
    it('Recipes count correct', async () => {
        const result = await countProvider.getRecipesCount()
        expect(result).toBe(0)
    })



})