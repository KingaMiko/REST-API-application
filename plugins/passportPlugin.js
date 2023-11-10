import passport from "passport";
import setJWTStrategy from "#config/jwt.js";

export const passportPlugin = (app) => {
  app.use(passport.initialize());
  setJWTStrategy();
};
