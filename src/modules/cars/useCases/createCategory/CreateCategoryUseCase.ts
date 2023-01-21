import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";



interface IRequest {
    name: string;
    description: string;
}

/**
 *  [x] - Dfinir o tipo de retorno;
 *  [x] - Alterar o retorno de erro;
 *  []x - Acessar o repositório;
 *  [x] - retornar algo;
 */

@injectable()
class CreateCategoryUseCase {
    
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {

    }

    //metodo execute por padrão em um service.
    async execute({ description, name  }: IRequest): Promise<void> {

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new AppError("Category Already exists!");
            // return response.status(400).json({ message: "Category Already exists!"});
        }
    
        this.categoriesRepository.create({name, description});
    }
}



export { CreateCategoryUseCase }