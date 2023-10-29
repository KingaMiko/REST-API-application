import express from "express";
import * as contactsControllers from "../../controllers/index.js";

const router = express.Router();
const {
  indexContacts,
  showContacts,
  createContacts,
  deleteContacts,
  updateContacts,
  //patchContact,
} = contactsControllers;

router.get("/", indexContacts);
router.get("/:contactId", showContacts);
router.post("/", createContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContacts);
//router.patch("/:contactId", patchContact);

export default router;
