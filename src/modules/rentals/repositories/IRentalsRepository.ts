import { ICreateRentalIDTO } from "../dtos/ICreateRetalIDTO";
import { Rental } from "../infra/typeorm/entities/Rental";



interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data:ICreateRentalIDTO): Promise<Rental>;
}

export { IRentalsRepository };