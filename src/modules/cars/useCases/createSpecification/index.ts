import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";



// const specficicationRepository = new SpecificationsRepository();
const specficicationRepository = null;

const createSpecificationUseCase = new CreateSpecificationUseCase(specficicationRepository);

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);


export { specficicationRepository, createSpecificationUseCase, createSpecificationController }