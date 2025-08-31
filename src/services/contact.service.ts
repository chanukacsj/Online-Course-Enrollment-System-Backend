import Contact from "../model/contact.model";
import {ContactDto} from "../dto/contact.dto";

export const validateContact = (contact: ContactDto) => {
    console.log(contact, "contact");
    if (!contact.name || !contact.email || !contact.message) {
        return 'All fields are required';
    }
    if (!/\S+@\S+\.\S+/.test(contact.email)) {
        return 'Invalid email format';
    }
    return null;
}
export const getAllContacts = async () => Contact.find();

export const saveContact = async (contact: ContactDto): Promise<any> => {
    console.log("contact data: ", contact)
    return Contact.create(contact);
};