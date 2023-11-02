import Contact from "#models/contact.js";

export const fetchContacts = () => Contact.getAll();

export const fetchContact = (contactId) => Contact.findById(contactId);

export const addContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone });

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
