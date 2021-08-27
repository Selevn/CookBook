import { EntryPoint } from '../../../admin/src/constants/ServerRoutes';
const { passportMiddlewareProvider } = require('../../JWT/PasswordProvider');

function Routing(passport) {
  const passwordMiddleware = passportMiddlewareProvider(passport);

  const express = require('express');
  const router = express.Router();

  const userStatisticsRouter = require('./UsersStatistics');
  router.use(EntryPoint.USERS_STATISTICS, passwordMiddleware, userStatisticsRouter);

  const cookbooksStatisticsRouter = require('./CookBooksStatistics');
  router.use(EntryPoint.COOKBOOKS_STATISTICS, passwordMiddleware, cookbooksStatisticsRouter);

  const recipesStatisticsRouter = require('./RecipesStatistics');
  router.use(EntryPoint.RECIPES_STATISTICS, passwordMiddleware, recipesStatisticsRouter);

  const globalStatisticRouter = require('./GlobalStatistics');
  router.use(EntryPoint.GLOBAL_STATISTICS, passwordMiddleware, globalStatisticRouter);
  return router;
}

module.exports = Routing