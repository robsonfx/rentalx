import { Router } from 'express';
import multer from "multer";

// import createCategoryController  from '../modules/cars/useCases/createCategory';


import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '../midlewares/ensureAuthenticated';
import { ensureAdmin } from '../midlewares/ensureAdmin';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle);


export { categoriesRoutes };