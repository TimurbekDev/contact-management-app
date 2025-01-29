import { IContact } from "../types/ContactType";
import { customAxios } from "../utils/customAxios";

export const updateContact = async (payload: IContact) => {
    try {
        return await customAxios.put(`/contacts/${payload.id}`, payload);
    } catch (error) {
        console.error("Error updating", error);
    }
}