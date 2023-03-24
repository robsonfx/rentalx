import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<void> {

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const retalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (retalOpenToUser) {
            throw new AppError("There's a retal in progress for user!");
        }

    }
}


export { CreateRentalUseCase };
