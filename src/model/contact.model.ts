import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);


// @ts-ignore
const ContactModel =
    new mongoose.Schema(
        {
            "contactId": {
                type: Number,
                unique: true,
                index: true
            },
            "name": {
                type: String,
                required: true
            },
            "email": {
                type: String,
                required: true
            },
            "message": {
                type: String,
                required: true
            }
        });
ContactModel.plugin(AutoIncrement, {inc_field: "contactId"});

// @ts-ignore
const Contact = mongoose.model("Contact", ContactModel);
export default Contact;