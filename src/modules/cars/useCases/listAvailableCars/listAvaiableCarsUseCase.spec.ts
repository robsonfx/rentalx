import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

        const cars = await listAvailableCarsUseCase.execute(
            {}
        );
        
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "Car2",
                description: "Car Description",
                daily_rate: 140.00,
                license_plate: "QLQ-5552",
                fine_amount: 100,
                brand: "CarBrand_test",
                category_id: "category_id",
            }
        );

        const cars = await listAvailableCarsUseCase.execute(
            {
                brand: "CarBrand_test",
                
            }
        );
      
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "Car3",
                description: "Car Description",
                daily_rate: 140.00,
                license_plate: "QLQ-1235",
                fine_amount: 100,
                brand: "CarBrand_test",
                category_id: "category_id",
            }
        );

        const cars = await listAvailableCarsUseCase.execute(
            {
                name: "Car3",
                
            }
        );
  
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create(
            {
                name: "Car3",
                description: "Car Description",
                daily_rate: 140.00,
                license_plate: "QLQ-1235",
                fine_amount: 100,
                brand: "CarBrand_test",
                category_id: "12345",
            }
        );

        const cars = await listAvailableCarsUseCase.execute(
            {
                category_id: "12345",
                
            }
        );
  
        expect(cars).toEqual([car]);
    });
});