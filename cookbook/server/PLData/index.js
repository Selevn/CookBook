const { Pool } = require('pg');

const {Aggregator} = require("./utils/Aggregator");
const {COMMON} = require("./ConstantsProvider")



const PLConnector = (connectionObject) => {
  const pool = new Pool(connectionObject || {
    user: 'postgres',
    host: '10.211.55.8',
    database: 'cookbook',
    password: 'Aa1234',
    port: 5432,
  })
  const {providerWrapper} = require("./DataProvider");
    return {
      pool:pool,
      functions: providerWrapper(pool)
    }
}

exports.PLConnector = PLConnector