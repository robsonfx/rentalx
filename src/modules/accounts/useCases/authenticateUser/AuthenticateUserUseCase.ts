import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";



interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}


// Gerar jsonwebtoken

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verificar se o Uusario existe;
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);
        
        // Se a senha está correta;
        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "931168b7b8023214d8617621ca4f57d2", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = { 
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn;


    }

}

export { AuthenticateUserUseCase }