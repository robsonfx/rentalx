//aula de TDD

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })
    
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with exists licence plate", () => {
        expect(async () => {
           await createCarUseCase.execute({
                name: "Car 01",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Car 02",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            });

        }).rejects.toBeInstanceOf(AppError);
    } );


    it("should able to create car a with avaliable true by default", async () => {
    
           const car = await createCarUseCase.execute({
            name: "Car Avaliable",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABCd-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
           });
           console.log(car);
           expect(car.available).toBe(true);
   
    } );
} )