import Contact from "#models/contact.js";

export const fetchContacts = async (userId, { page, limit, favorite }) => {
  const query = { owner: userId };
  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }

  const contacts = await Contact.find(query)
    .limit(limit)
    .skip((page - 1) * limit);

  const total = await Contact.countDocuments(query);

  return {
    contacts,
    total,
  };
};

export const fetchContact = (contactId) => Contact.findById(contactId);

export const addContact = ({ name, email, phone, userId }) =>
  Contact.create({ name, email, phone, owner: userId });

export const removeContact = (contactId) =>
  Contact.deleteOne({ _id: contactId });

export const updateContact = async ({ contactId, toUpdate, upsert = false }) =>
  Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: toUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );
export const updateStatusContact = async ({ contactId, favorite }) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: { favorite } },
    { new: true }
  );
  return updatedContact;
};
