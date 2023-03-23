import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../midlewares/ensureAdmin";
import { ensureAuthenticated } from "../midlewares/ensureAuthenticated";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsEspecificationController = new CreateCarSpecificationController;

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarsEspecificationController.handle);

export { carsRoutes };