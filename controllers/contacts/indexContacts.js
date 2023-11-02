import { fetchContacts } from "#repository/contacts/contactRepository.js";

export async function indexContacts(req, res, next) {
  try {
    const contacts = await fetchContacts();
    return res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
}
