import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import User from "#models/user.js";

export default function setJWTStrategy() {
  const secret = process.env.SECRET_KEY;

  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  };

  passport.use(
    new JWTStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.sub).lean();
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
}
