import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../midlewares/ensureAdmin";
import { ensureAuthenticated } from "../midlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

export { carsRoutes };