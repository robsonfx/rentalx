import { app } from "@shared/infra/http/app";
import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create Category Crontroller", () => {

    beforeAll( async () => {
        
        connection = await createConnection();
        await connection.runMigrations();

        const password = await hash("admin", 8);
        const id = uuid();

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_licence)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXY')
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })
    
    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions")
        .send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app).get("/categories")
        .send({
            name: "Category Supertest",
            description: "Category Supertest",
        }).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(200);
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions")
        .send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app).get("/categories")
        .send({
            name: "Category Supertest",
            description: "Category Supertest",
        }).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(200);
    });


    it("Should not be able to create a new category whit name exists!", async () => {
        const responseToken = await request(app).post("/sessions")
        .send({
            email: "admin@rentx.com.br",
            password: "admin",
        });

        const { token } = responseToken.body;

        const response = await request(app).get("/categories")
        .send({
            name: "Category Supertest",
            description: "Category Supertest",
        }).set({
            Authorization: `Bearer ${token}`,
        });

        expect(response.status).toBe(400);
    });
});