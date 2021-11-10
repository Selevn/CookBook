const {HOME_ROUTES} = require("../src/constants");
const {Connector} = require("./Data/index")
const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport')
const dotenv = require('dotenv')
const result = dotenv.config({ path: '../.env' })

const {AdminAPI} = require("../admin/src/constants/ServerRoutes");

if (result.error) {
    throw result.error
}
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


const connection = Connector(process.env.DB_CONNECTION_STRING)
global.pool = connection.pool
app.use(passport.initialize());
require('./JWT/PassportConfig.js')(passport)

const loginRouter = require('./Routes/Login');
app.use(HOME_ROUTES.LOGIN,loginRouter)

const editRouter = require('./Routes/Edit')(passport);
app.use(HOME_ROUTES.EDIT,editRouter)

const crateRouter = require('./Routes/Create')(passport);
app.use(HOME_ROUTES.EDIT,crateRouter)

const checkRouter = require('./Routes/Check');
app.use(HOME_ROUTES.CHECK,checkRouter)

const userInteractionsRouter = require('./Routes/UserInteractions')(passport);
app.use(HOME_ROUTES.USER_INTERACTIONS,userInteractionsRouter)

const usersDataRouter = require('./Routes/UserThings');
app.use(HOME_ROUTES.USER_DATA, usersDataRouter)

const itemRouter = require('./Routes/GetItem');
app.use(HOME_ROUTES.GET, itemRouter)

const adminRouter = require('./Routes/AdminRoutes/AdminMainRoute.js')(passport);
app.use(AdminAPI, adminRouter)

app.listen(process.env.BACKEND_PORT, process.env.IP, () => console.log(`Listening on ${process.env.IP}:${process.env.BACKEND_PORT}`));
