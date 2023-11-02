import express from "express";
import contactsRouter from "#routes/api/contacts.js";
import { corsPlugin, bodyParserPlugin } from "#plugins/corsPlugin.js";
import { loggerPlugin } from "#plugins/loggerPlugin.js";
import { noFound } from "#controllers/errors/noFound.js";
import { remainingErrors } from "#controllers/errors/remainingErrors.js";

const app = express();
corsPlugin(app);
bodyParserPlugin(app);
loggerPlugin(app);
app.use("/api/contacts", contactsRouter);
app.use(noFound);
app.use(remainingErrors);
export default app;
