
import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import  { carsRoutes } from './cars.routes'

const router = Router();

//configurando a rota;
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use(authenticateRoutes); //busca a uri no /


export { router }