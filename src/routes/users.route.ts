import { Router } from "express";
import { CreateUserContoller } from "../modules/accounts/useCases/createUser/CreateUserController";


const usersRoutes = Router();

const createUserController = new CreateUserContoller();

usersRoutes.post("/", createUserController.handle);


export { usersRoutes }