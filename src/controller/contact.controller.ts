import { Request, Response } from "express";
import * as contactService from '../services/contact.service';

export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while fetching contacts'
        });
    }
}
export const saveContact = async (req: Request, res: Response) => {
    try {
        const newContact = req.body;
        const validationError = contactService.validateContact(newContact);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return;
        }

        const savedContact = await contactService.saveContact(newContact);
        res.status(201).json(savedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while saving the contact'
        });
    }
}