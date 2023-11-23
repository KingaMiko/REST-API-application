import swaggerUi from "swagger-ui-express";
import swaggerSpec from "#config/swaggerConfig.js";

const swaggerPlugin = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerPlugin;
