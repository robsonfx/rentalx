import { Router } from 'express';
import { ensureAuthenticated } from '../midlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '../midlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);


export { specificationsRoutes }