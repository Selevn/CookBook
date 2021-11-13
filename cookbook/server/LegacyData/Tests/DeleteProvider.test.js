const {USER_FIELDS} = require("../ConstantsProvider")
const {getCookBooks, getCookBook, getRecipes, getRecipe, getComments} = require("../Providers/GetProviders")
const {likeCookBook} = require("../Providers/InteractionsProvider")
const {createUser, createCookBook, createRecipe, addComment} = require("../Providers/CreateProvider")
const db = require('./dbTestProvider')
const {COMMENT_FIELDS} = require("../ConstantsProvider");
const {likeRecipe} = require("../Providers/InteractionsProvider");
const {RECIPE_FIELDS} = require("../ConstantsProvider");
const {COOKBOOK_FIELDS} = require("../ConstantsProvider");
const {blockUser} = require("../Providers/DeleteProvider");
const {getUser} = require("../Providers/GetUserDataProviders");
const {COMMON} = require("../ConstantsProvider");
const {recipes} = require("./TestConstants");
const {users, cookbooks, comments} = require("./TestConstants");

const {deleteUser, deleteCookBook, deleteRecipe, deleteComment} = require("../Providers/DeleteProvider")

const {user1Full, user1Private, user1Public, user2Full, user2Private, user2Public, userClear} = users
const {cookbook1, cookbook2} = cookbooks
const {recipe1, recipe2, recipe3, recipe4} = recipes
const {comment2, comment1, comment3, comment4} = comments

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe("Delete comment", ()=>{

    it("No arg delete comment", async ()=>{
        const result = await deleteComment()
        expect(result).toBeFalsy()
    })
    it("NULL arg delete comment", async ()=>{
        const result = await deleteComment(null)
        expect(result).toBeFalsy()
    })
    it("Inf arg delete comment", async ()=>{
        const result = await deleteComment(1000)
        expect(result).toBeFalsy()
    })
    it("Normal arg delete cookbook comment", async ()=>{
        await createUser({...user1Full, [USER_FIELDS.comments]:[] })
        await createCookBook({...cookbook1, author:1, commentsIds:[] })
        await addComment({[COMMENT_FIELDS.author]:1, [COMMENT_FIELDS.itemId]:1,[COMMENT_FIELDS.itemType]:COMMON.COOKBOOK, [COMMENT_FIELDS.text]:"newComment"})

        let user = (await getUser(1))[0]
        let cookBook = (await getCookBook(1))[0]
        expect(user[USER_FIELDS.comments]).toContain(1)
        expect(cookBook.commentsIds).toContain(1)

        const result = await deleteComment(1)
        expect(result).toBeTruthy()

        user = (await getUser(1))[0]
        cookBook = (await getCookBook(1))[0]
        expect(user[USER_FIELDS.comments]).not.toContain(1)
        expect(cookBook.commentsIds).not.toContain(1)
    })

    it("Normal arg delete recipe comment", async ()=>{
        await createUser({...user1Full, [USER_FIELDS.comments]:[] })
        await createRecipe({...recipe1, author:1, commentsIds:[] })
        await addComment({[COMMENT_FIELDS.author]:1, [COMMENT_FIELDS.itemId]:1,[COMMENT_FIELDS.itemType]:COMMON.RECIPE, [COMMENT_FIELDS.text]:"newComment"})

        let user = (await getUser(1))[0]
        let recipe = (await getRecipe(1))[0]
        expect(user.comments).toContain(1)
        expect(recipe.commentsIds).toContain(1)

        const result = await deleteComment(1)
        expect(result).toBeTruthy()

        user = (await getUser(1))[0]
        recipe = (await getRecipe(1))[0]
        expect(user.comments).not.toContain(1)
        expect(recipe.commentsIds).not.toContain(1)
    })
})

describe("Delete user", ()=>{
    it("No arg delete user", async ()=>{
        const result = await deleteUser()
        expect(result).toBeFalsy()
    })
    it("NULL arg delete user", async ()=>{
        const result = await deleteUser(null)
        expect(result).toBeFalsy()
    })
    it("Inf arg delete user", async ()=>{
        const result = await deleteUser(1000)
        expect(result).toBeFalsy()
    })
    it("Normal arg delete empty user", async ()=>{
        await createUser({...user1Full, comments:[] })
        let user = (await getUser(1))[0]
        expect(user).toBeTruthy()

        const result = await deleteUser(1)
        expect(result).toBeTruthy()

        user = (await getUser(1))[0]
        expect(user).toBeFalsy()
    })
    it("Normal arg delete user with recipes and cookbooks", async ()=>{
        await createUser({...user1Full, [USER_FIELDS.comments]:[] })
        await createRecipe({...recipe1, author:1, commentsIds:[] })
        await createRecipe({...recipe2, author:2, commentsIds:[] })
        await createCookBook({...cookbook1, author:1, commentsIds:[] })
        await addComment({userId:1, itemId:2,type:COMMON.RECIPE, comment:"newComment"})

        let user = (await getUser(1))[0]
        expect(user).toBeTruthy()

        const result = await deleteUser(1)
        expect(result).toBeTruthy()

        user = (await getUser(1))[0]
        expect(user).toBeFalsy()

        const cookBook = (await getCookBook(1))[0]
        expect(cookBook).toBeFalsy()
        const _recipe = (await getRecipe(1))[0]
        expect(_recipe).toBeFalsy()
        const _recipe2 = (await getRecipe(2))[0]
        expect(_recipe2).toBeTruthy()

    })
})

describe("Block user", ()=>{
    it("No arg block user", async ()=>{
        const result = await blockUser()
        expect(result).toBeFalsy()
    })
    it("NULL arg block user", async ()=>{
        const result = await blockUser(null)
        expect(result).toBeFalsy()
    })
    it("Inf arg block user", async ()=>{
        const result = await blockUser(1000)
        expect(result).toBeFalsy()
    })
    it("Normal arg block empty user", async ()=>{
        await createUser({...user1Full, comments:[] })
        let user = (await getUser(1))[0]
        expect(user).toBeTruthy()

        const result = await blockUser(1)
        expect(result).toBeTruthy()

        user = (await getUser(1))[0]
        expect(user).toBeTruthy()
    })
    it("Normal arg block user with recipes and cookbooks", async ()=>{
        await createUser({...user1Full, [USER_FIELDS.comments]:[] })
        await createRecipe({...recipe1, author:1, commentsIds:[] })
        await createRecipe({...recipe2, author:2, commentsIds:[] })
        await createCookBook({...cookbook1, author:1, commentsIds:[] })
        await addComment({userId:1, itemId:1,type:COMMON.RECIPE, comment:"newComment"})

        let user = (await getUser(1))[0]
        expect(user).toBeTruthy()

        const result = await blockUser(1)
        expect(result).toBeTruthy()

        user = (await getUser(1))[0]
        expect(user).toBeTruthy()

        const cookBook = (await getCookBook(1))[0]
        expect(cookBook).toBeTruthy()
        const _recipe = (await getRecipe(1))[0]
        expect(_recipe).toBeTruthy()
        const _recipe2 = (await getRecipe(2))[0]
        expect(_recipe2).toBeTruthy()

    })
})

describe("Delete cookbook", ()=>{
    it("No arg delete cookbook", async ()=>{
        const result = await deleteCookBook()
        expect(result).toBeFalsy()
    })
    it("NULL arg delete cookbook", async ()=>{
        const result = await deleteCookBook(null)
        expect(result).toBeFalsy()
    })
    it("Inf arg delete cookbook", async ()=>{
        const result = await deleteCookBook(1000)
        expect(result).toBeFalsy()
    })
    it("Normal arg delete empty cookbook", async ()=>{
        await createCookBook({...cookbook1, [COOKBOOK_FIELDS.author]:user1Full._id, [COOKBOOK_FIELDS.commentsIds] :[] })

        const result = await deleteCookBook(1)
        expect(result).toBeTruthy()

        const result2 = (await getCookBook(1))[0]
        expect(result2).toBeFalsy()

    })
    it("Normal arg delete cookbook with user likes", async ()=>{
        await createUser({...user1Full, comments:[] })
        await createUser({...user2Full, comments:[] })
        await createCookBook({...cookbook1, author:1, commentsIds:[] })

        let user = (await getUser(1))[0]
        expect(user).toBeTruthy()
        await likeCookBook(1, 1)


        const result = await deleteCookBook(1)
        expect(result).toBeTruthy()

        user = (await getUser(1))[0]
        expect(user).toBeTruthy()
        expect(user[USER_FIELDS.likes].cookBooks).not.toContain(1)
    })
})

describe("Delete recipe", ()=>{
    it("No arg delete recipe", async ()=>{
        const result = await deleteRecipe()
        expect(result).toBeFalsy()
    })
    it("NULL arg delete recipe", async ()=>{
        const result = await deleteRecipe(null)
        expect(result).toBeFalsy()
    })
    it("Inf arg delete recipe", async ()=>{
        const result = await deleteRecipe(1000)
        expect(result).toBeFalsy()
    })
    it("Normal arg delete empty recipe", async ()=>{
        await createRecipe({...cookbook1, [RECIPE_FIELDS.author]:user1Full._id, [RECIPE_FIELDS.commentsIds] :[] })

        const result = await deleteRecipe(1)
        expect(result).toBeTruthy()

        const result2 = (await getRecipe(1))[0]
        expect(result2).toBeFalsy()

    })
    it("Normal arg delete recipe with user likes", async ()=>{
        await createUser({...user1Full, comments:[] })
        await createRecipe({...recipe1, author:1, commentsIds:[] })

        await likeRecipe(1, 1)

        const result = await deleteRecipe(1)
        expect(result).toBeTruthy()

        const user = (await getUser(1))[0]
        expect(user).toBeTruthy()
        expect(user[USER_FIELDS.likes].recipes).not.toContain(1)

    })
    it("Normal arg delete recipe in cookbook", async ()=>{
        await createRecipe({...recipe1, author:1, commentsIds:[] })
        await createCookBook({...cookbook1, [COOKBOOK_FIELDS.recipesIds]:[1]})

        const result = await deleteRecipe(1)
        expect(result).toBeTruthy()

        const data = (await getRecipes({ids:JSON.stringify([1])}))
        expect(data.docs).not.toContain(1)
    })
    it("Normal arg delete recipe in cookbook and in user like", async ()=>{
        await createUser({...user1Full, comments:[] })
        await createRecipe({...recipe1, author:1, commentsIds:[] })
        await createCookBook({...cookbook1, [COOKBOOK_FIELDS.recipesIds]:[1]})

        await likeRecipe(1, 1)

        const result = await deleteRecipe(1)
        expect(result).toBeTruthy()

        const user = (await getUser(1))[0]
        expect(user).toBeTruthy()
        expect(user[USER_FIELDS.likes].recipes).not.toContain(1)

        const data = (await getRecipes({ids:JSON.stringify([1])}))
        expect(data.docs).not.toContain(1)
    })

})