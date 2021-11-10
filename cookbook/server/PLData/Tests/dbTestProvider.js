const { PLConnector } = require('../index.js')

let pool, functions;

module.exports.connect = async () => {
    let obj = PLConnector({
        user: 'postgres',
        host: 'localhost',
        database: 'cookbook',
        password: 'password',
        port: 5432,
    });
    pool = obj.pool
    functions = obj.functions
    return functions;
}

module.exports.closeDatabase = async () => {
    await pool.close()
}

module.exports.clearDatabase = async () => {
    await pool.query(`
        truncate table comments cascade;
truncate table cookbooks cascade;
truncate table users cascade;
truncate table liked cascade;
truncate table recipes cascade;
truncate table recipes_in_cookbooks cascade;
ALTER SEQUENCE "Users__id_seq" RESTART WITH 1;
ALTER SEQUENCE "Liked_likeId_seq" RESTART WITH 1;
ALTER SEQUENCE "comments__id_seq" RESTART WITH 1;
ALTER SEQUENCE "cookbooks__id_seq" RESTART WITH 1;
ALTER SEQUENCE "recipes__id_seq" RESTART WITH 1;
    `)
}