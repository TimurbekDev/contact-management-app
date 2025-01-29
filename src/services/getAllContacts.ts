import { customAxios } from "../utils/customAxios";

export const getAllContacts = async () => {
    try {
        return (await customAxios.get('/contacts')).data
    } catch (error) {
        console.error('Fetching error', error);
    }
}