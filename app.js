import express from "express";

import contactsRouter from "#routes/api/contacts.js";
import usersRouter from "#routes/api/users.js";

import { corsPlugin, bodyParserPlugin } from "#plugins/corsPlugin.js";
import { passportPlugin } from "#plugins/passportPlugin.js";
import { loggerPlugin } from "#plugins/loggerPlugin.js";
import swaggerPlugin from "#plugins/swaggerPlugin.js";

import { remainingErrors } from "#controllers/errors/remainingErrors.js";
import { noFound } from "#controllers/errors/noFound.js";

import { handleError } from "#middlewares/errorHandler.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
corsPlugin(app);
bodyParserPlugin(app);
loggerPlugin(app);
swaggerPlugin(app);
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

passportPlugin(app);
app.use(noFound);
app.use(remainingErrors);
app.use(handleError);
export default app;
