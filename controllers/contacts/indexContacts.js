import { fetchContacts } from "#repository/contacts/contactRepository.js";

export async function indexContacts(req, res, next) {
  try {
    const userId = req.user._id;

    const { page = 1, limit = 20, favorite } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      ...(favorite && { favorite: favorite === "true" }),
    };

    //const { contacts, total } = await fetchContacts(userId, options);
    const result = await fetchContacts(userId, options);
    if (!result) {
      throw new Error("fetchContacts did not return any result.");
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts: result.contacts,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
        limit: options.limit,
      },
    });
  } catch (error) {
    next(error);
  }
}
