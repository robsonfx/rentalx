import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";




class CreateUserContoller{
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, username, email, password, driver_licence} = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        

        await createUserUseCase.execute({
            name,
            email,
            password,
            driver_licence,
        });

        return response.status(201).send(); 
    }

}

export { CreateUserContoller }