import { removeContact } from "../../helpers/contacts/contactHelpers.js";

export async function deleteContacts(req, res, next) {
  try {
    const contact = await removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    return res.json({
      status: "success",
      code: 204,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
}
