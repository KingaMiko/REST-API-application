import { addContact } from "../../helpers/contacts/contactHelpers.js";
import contactSchema from "../../validators/contactSchema.js";

export async function createContacts(req, res, next) {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.details[0].message,
      });
    }

    const { name, email, phone } = req.body;
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
  } catch (error) {
    next(error);
  }
}
