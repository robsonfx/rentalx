import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Retanl", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it("Should be able to create a new retal", async () => {

        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "32149",
            expected_return_date: new Date(),
        });
    });

});