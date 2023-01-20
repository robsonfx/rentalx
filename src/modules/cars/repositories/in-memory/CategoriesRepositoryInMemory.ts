import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository{
    catogires: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.catogires.find((category) => category.name === name);
        return category;
    }
    
    async list(): Promise<Category[]> {
        const all = this.catogires;
        return all;
    }
    
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.catogires.push(category);
    }


}

export { CategoriesRepositoryInMemory }