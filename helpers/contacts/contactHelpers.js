import Contact from "../../models/contact.js";
export const fetchContacts = () => Contact.getAll();
