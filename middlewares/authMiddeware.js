import passport from "passport";

export default function authMiddleware(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
}
