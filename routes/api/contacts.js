import express from "express";
import * as contactsControllers from "#controllers/index.js";
import { authMiddleware } from "#middlewares/authMiddeware.js";
import { bodyValidate } from "../../middlewares/validate.js";
import contactSchema from "#validators/contactSchema.js";

const router = express.Router();
const {
  indexContacts,
  showContacts,
  createContacts,
  deleteContacts,
  updateContacts,
  updateFavorite,
} = contactsControllers;

router.get("/", authMiddleware, indexContacts);
router.get("/:contactId", authMiddleware, showContacts);
router.post("/", authMiddleware, bodyValidate(contactSchema), createContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.patch("/:contactId/favorite", updateFavorite);

export default router;
