import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


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

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {

    }

    //metodo execute por padrão em um service.
    execute({ description, name  }: IRequest): void {

        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists) {
            throw new Error("Category Already exists!");
            // return response.status(400).json({ message: "Category Already exists!"});
        }
    
        this.categoriesRepository.create({name, description});
    }
}



export { CreateCategoryUseCase }