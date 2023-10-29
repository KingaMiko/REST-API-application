import {
  updateStatusContact,
  fetchContact,
} from "../../helpers/contacts/contactHelpers.js";

export async function updateFavorite(req, res, next) {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field 'favorite'" });
    }
    if (typeof favorite !== "boolean") {
      return res.status(400).json({ message: "'favorite' must be a boolean" });
    }

    const existingContact = await fetchContact(contactId);
    if (!existingContact) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await updateStatusContact({ contactId, favorite });

    return res.status(200).json({
      status: "success",
      code: 200,
      data: { result: updatedContact },
    });
  } catch (error) {
    next(error);
  }
}
