const { Pool } = require('pg');

const {Aggregator} = require("./utils/Aggregator");
const {COMMON} = require("./ConstantsProvider")



const PLConnector = (connectionObject) => {
  if(!connectionObject)
    console.log("No connection specified, use default.");
  const pool = new Pool(connectionObject || {
    user: 'postgres',
    host: 'localhost',
    database: 'cookbook',
    password: 'password',
    port: 5433,
  })
  setInterval(()=>{
    let a = pool;
  }, 5000)
  const {providerWrapper} = require("./DataProvider");
    return {
      pool:pool,
      functions: providerWrapper(pool)
    }
}

exports.PLConnector = PLConnector