import expresss from "express";
import swaggerUi from "swagger-ui-express";


import { router } from "./routes";
import swaggerFile from "./swagger.json";

// import "./database";

const app = expresss();

app.use(expresss.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);






app.listen(3333, () => console.log("server is running"));