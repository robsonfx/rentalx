import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const listCategoriesRipository =  CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(listCategoriesRipository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);



export { listCategoriesController }
