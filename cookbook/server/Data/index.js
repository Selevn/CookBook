const { Pool } = require('pg');

const {Aggregator} = require("./utils/Aggregator");
const {COMMON} = require("./ConstantsProvider")



const PLConnector = (connectionObject) => {
  const pool = new Pool(connectionObject || {
    user: 'postgres',
    host: 'localhost',
    database: 'cookbook',
    password: 'password',
    port: 5433,
  })
  const {providerWrapper} = require("./DataProvider");
    return {
      pool:pool,
      functions: providerWrapper(pool)
    }
}

exports.PLConnector = PLConnector