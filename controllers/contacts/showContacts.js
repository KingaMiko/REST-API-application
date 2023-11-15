import { fetchContact } from "#repository/contacts/contactRepository.js";
import { ErrorHandler } from "#middlewares/errorHandler.js";

export async function showContacts(req, res, next) {
  try {
    const contact = await fetchContact(req.params.contactId);
    if (!contact) {
      throw new ErrorHandler(404, "Not found");
    }

    return res.json({
      status: "success",
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
}
