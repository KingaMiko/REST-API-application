import { addContact } from "#repository/contacts/contactRepository.js";

export async function createContacts(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    const { _id } = req.user;
    const newContact = await addContact({
      name,
      email,
      phone,
      userId: _id,
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
