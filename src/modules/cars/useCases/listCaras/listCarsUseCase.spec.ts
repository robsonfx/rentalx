import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./listCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "Car01",
                description: "Car Description",
                daily_rate: 140.00,
                license_plate: "QLQ-9408",
                fine_amount: 100,
                brand: "CarBrand",
                category_id: "category_id",
            }
        );

        const cars = await listCarsUseCase.execute(
            {}
        );
        
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars byt name", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "Car02",
                description: "Car Description",
                daily_rate: 140.00,
                license_plate: "QLQ-9408",
                fine_amount: 100,
                brand: "CarBrand_test",
                category_id: "category_id",
            }
        );

        const cars = await listCarsUseCase.execute(
            {
                brand: "Car_brand_teste",
                
            }
        );
        console.log(car);
        expect(cars).toEqual([car]);
    });

});