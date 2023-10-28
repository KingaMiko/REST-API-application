import Contact from "../../models/contact.js";

export const fetchContacts = () => Contact.getAll();

export const fetchContact = (contactId) => Contact.findById(contactId);
