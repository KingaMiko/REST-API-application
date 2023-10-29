import Contact from "../../models/contact.js";

export const fetchContacts = () => Contact.getAll();

export const fetchContact = (contactId) => Contact.findById(contactId);

export const addContact = ({ name, email, phone }) =>
  Contact.create({ name, email, phone });

export const removeContact = (contactId) =>
  Contact.deleteOne({ _id: contactId });
