import logger from "morgan";

export const loggerPlugin = (app) => {
  const formatsLogger = app.get("env") === "development" ? "dev" : "short";
  app.use(logger(formatsLogger));
};
