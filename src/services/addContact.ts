import { IContact } from "../types/ContactType";
import { customAxios } from "../utils/customAxios";

export const addContact = async (contact: IContact) => {
    try {
        return (await customAxios.post('/contacts', contact)).data;
    } catch (error) {
        console.error("Error adding:", error);
    }
}