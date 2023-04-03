import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Retanl", () => {
    const dayAdd24Hours = dayjs().add(2, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });

    it("Should be able to create a new retal", async () => {

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "32149",
            expected_return_date: dayAdd24Hours,
        });


        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });


    it("Should not be able to create a new rental if there is another open to the same user", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "32149",
                expected_return_date: dayAdd24Hours,
            });
    
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "32149",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);


    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });
    
            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);


    });

    it("Should not be able to create a new rental with invalid return time", async () => {

        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            });

        }).rejects.toBeInstanceOf(AppError);


    });
});