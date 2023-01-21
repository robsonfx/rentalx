import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    
    it("shold be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_licence: "00001238",
            email: "fulano@gmail.com",
            password: "1234",
            name: "user test"
        };
        await createUsersUseCase.execute(user);

        const result  =  await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    });


    it("should not be albe to authenticate an noexistsnt user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "456456",
            });
        }).rejects.toBeInstanceOf(AppError);
    });


    it("should not be albe to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_licence: "789798879",
                email: "ciclano@gmail.com",
                password: "3214",
                name: "user test"
            };
            await createUsersUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "777992",
            });
        }).rejects.toBeInstanceOf(AppError);
    
    });
});