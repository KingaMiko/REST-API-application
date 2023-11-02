import { fetchContact } from "#repository/contacts/contactRepository.js";

export async function showContacts(req, res, next) {
  try {
    const contact = await fetchContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
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
