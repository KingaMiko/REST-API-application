import express from "express";

import { bodyValidate } from "#middlewares/validate.js";
import * as contactsControllers from "#controllers/index.js";
import { authMiddleware } from "#middlewares/authMiddeware.js";

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

/**
 * @swagger
 * tags:
 *     name: Contact
 * /api/contacts:
 *   get:
 *     tags: [Contact]
 *     summary: Returns a list of contacts for the authenticated user.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Contacts list successfully retrieved.
 *       401:
 *         description: Missing or invalid authentication token.
 *       500:
 *         description: Internal server error.
 */

router.get("/", authMiddleware, indexContacts);
/**
 * @swagger
 * /api/contacts/{contactId}:
 *   get:
 *     tags: [Contact]
 *     summary: Get a contact by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         description: Unique ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact successfully retrieved.
 *       404:
 *         description: Contact not found.
 *       401:
 *         description: Missing or invalid authentication token.
 */
router.get("/:contactId", authMiddleware, showContacts);
/**
 * @swagger
 * /api/contacts:
 *   post:
 *     tags: [Contact]
 *     summary: Create a new contact
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact successfully created.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Missing or invalid authentication token.
 */
router.post("/", authMiddleware, bodyValidate(contactSchema), createContacts);
/**
 * @swagger
 * /api/contacts/{contactId}:
 *   delete:
 *     tags: [Contact]
 *     summary: Delete a contact
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         description: Unique ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact successfully deleted.
 *       404:
 *         description: Contact not found.
 *       401:
 *         description: Missing or invalid authentication token.
 */
router.delete("/:contactId", authMiddleware, deleteContacts);
/**
 * @swagger
 * /api/contacts/{contactId}:
 *   put:
 *     tags: [Contact]
 *     summary: Update a contact
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         description: Unique ID of the contact
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact successfully updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Contact not found.
 *       401:
 *         description: Missing or invalid authentication token.
 */

router.put("/:contactId", authMiddleware, updateContacts);
/**
 * @swagger
 * /api/contacts/{contactId}/favorite:
 *   patch:
 *     tags: [Contact]
 *     summary: Update the favorite status of a contact
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         description: Unique ID of the contact
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorite:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Favorite status updated.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Contact not found.
 *       401:
 *         description: Missing or invalid authentication token.
 */

router.patch("/:contactId/favorite", authMiddleware, updateFavorite);

export default router;
