import { removeContact } from "#repository/contacts/contactRepository.js";

import { ErrorHandler } from "#middlewares/errorHandler.js";

export async function deleteContacts(req, res, next) {
  try {
    const contact = await removeContact(req.params.contactId);
    if (!contact) {
      throw new ErrorHandler(404, "Not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
