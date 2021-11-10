const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')

const mongod = new MongoMemoryServer({ binary: { version: '4.0.14' } });

module.exports.connect = async () => {
    const uri = await mongod.getUri()
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    }
    await mongoose.connect(uri,options)
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections
    for(const key in collections){
        const collection = collections[key]
        await collection.deleteMany()
    }
}