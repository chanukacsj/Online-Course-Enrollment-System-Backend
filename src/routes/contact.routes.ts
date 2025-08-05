import {Router} from "express";
import {authorizeRole} from "../middleware/auth.middleware";
import {getAllContacts, saveContact} from "../controller/contact.controller";

const contactRouter: Router = Router();

contactRouter.get("/all", authorizeRole('admin'),getAllContacts);
contactRouter.post("/save", saveContact)

export default contactRouter;