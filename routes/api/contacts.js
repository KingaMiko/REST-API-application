import express from "express";
import * as contactsControllers from "../../controllers/index.js";

const router = express.Router();
const {
  indexContacts,
  showContacts,
  createContacts,
  deleteContacts,
  updateContacts,
  updateFavorite,
} = contactsControllers;

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.post("/", createContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
router.patch("/:contactId/favorite", updateFavorite);

export default router;
