const mongoose = require('mongoose')
const {providerWrapper} = require("./DataProvider");
const {Aggregator} = require("./utils/Aggregator");
const {COMMON} = require("./ConstantsProvider")

const Connector = (connectionString) => {
    async function start() {
        try {
            await mongoose.connect(connectionString,
                {
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true,
                })

        } catch (e) {
            console.log(e)
        }
    }
    start()
        .then(r => console.log('Connected to bd'))
    //const aggregateOptions = Aggregator(COMMON)

    return providerWrapper
}

exports.Connector = Connector