import {
  updateContact,
  addContact,
  fetchContact,
} from "#repository/contacts/contactRepository.js";
import contactSchema from "#validators/contactSchema.js";

export async function updateContacts(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: "error",
        code: 400,
        message: errorMessage,
      });
    }
    const existingContact = await fetchContact(contactId);
    if (existingContact) {
      const updatedContact = await updateContact({
        contactId,
        toUpdate: {
          name,
          email,
          phone,
        },
      });

      return res.status(200).json({
        status: "success",
        code: 200,
        data: { result: updatedContact },
      });
    } else {
      const newContact = await addContact({
        name,
        email,
        phone,
      });

      return res.status(201).json({
        status: "success",
        code: 201,
        data: { result: newContact },
      });
    }
  } catch (error) {
    next(error);
  }
}
